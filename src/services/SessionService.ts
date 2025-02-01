import Session from '../models/Session';
import ISession from '../models/interfaces/ISession';
import addHours from '../utils/addHours';
import { signupType } from '../rest/v1/schemas/session/signup';
import UserService from './UserService';
import { GetInjection } from '../utils/getInjection';
import ISessionRepository from '../repositories/interfaces/ISessionRepository';
import Tx from '../models/interfaces/Tx';
import ICredentialRepository from '../repositories/interfaces/ICredentialRepository';
import { CredentialStatus, CredentialTypes } from '../models/interfaces/ICredential';
import { LoginTypes } from '../models/interfaces/ILogin';
import Login from '../models/Login';

const crypto = require('crypto');

export default class SessionService {
	@GetInjection('SessionRepository')
	private sessionRepository: ISessionRepository;

	@GetInjection('CredentialRepository')
	private credentialRepository: ICredentialRepository;

	@GetInjection(UserService)
	private userService: UserService;

	public async login(
		value: string,
		type: CredentialTypes,
		key?: string,
		tx?: Tx
	): Promise<Session> {
		let userId: string;
		if (key) {
			userId = await this.credentialRepository.loginByKey(value, key, tx);
		} else {
			userId = await this.credentialRepository.loginByType(value, type, tx);
		}

		return await this.create(userId, tx);
	}

	public async addLogin(userId: string, type: LoginTypes, key: string, tx?: Tx): Promise<Login> {
		return await this.credentialRepository.addLogin(
			{
				userId,
				type,
				key,
			},
			tx
		);
	}

	public async create(userId: string, tx?: Tx): Promise<Session> {
		const currentDate = new Date();
		const expireDate = addHours(new Date(currentDate.getTime()), 24);

		const sessionProps: Omit<ISession, 'id'> = {
			userId,
			token: crypto.randomUUID(),
			retrievedAt: currentDate,
			expiresAt: expireDate,
			isActive: true,
		};

		return await this.sessionRepository.create(sessionProps, tx);
	}

	public async refreshSession(sessionId: string, userId: string, tx?: Tx): Promise<Session> {
		await this.sessionRepository.invalidate(userId, sessionId, tx);

		return await this.create(userId, tx);
	}

	public async getByToken(token: string, tx?: Tx): Promise<Session> {
		return await this.sessionRepository.getByToken(token, tx);
	}

	public async isSessionValid(session: Session, tx?: Tx): Promise<boolean> {
		const currentDate = new Date();
		if (currentDate > session.expiresAt) {
			await this.sessionRepository.invalidate(session.userId, session.id, tx);
			return false;
		} else {
			return true;
		}
	}

	public async signup(signup: signupType, tx?: Tx): Promise<Session> {
		// create user
		const createdUser = await this.userService.create(signup, tx);

		await this.credentialRepository.create(
			{
				userId: createdUser.id,
				type: signup.credentialType,
				value: signup.credential,
				status: CredentialStatus.ACTIVE,
			},
			tx
		);

		if (signup.login) {
			await this.credentialRepository.addLogin(
				{
					userId: createdUser.id,
					type: signup.loginType,
					key: signup.login,
				},
				tx
			);
		}

		// create session
		return await this.create(createdUser.id, tx);
	}
}
