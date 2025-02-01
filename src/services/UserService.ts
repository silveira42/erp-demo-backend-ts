import { GetInjection } from '../utils/getInjection';
import User from '../models/User';
import IUser from '../models/interfaces/IUser';
import IUserRepository from '../repositories/interfaces/IUserRepository';
import { signupType } from '../rest/v1/schemas/session/signup';
import Tx from '../models/interfaces/Tx';
import { userUpdateType } from '../rest/v1/schemas/user/update';

export default class UserService {
	@GetInjection('UserRepository')
	private userRepository: IUserRepository;

	public async get(userId: string, tx?: Tx): Promise<User> {
		return await this.userRepository.get(userId, tx);
	}

	public async create(signup: signupType, tx?: Tx): Promise<User> {
		const settings = signup.settings || User.getDefaultSettings();

		const userProps: Omit<IUser, 'id'> = {
			fullName: signup.fullName,
			nickName: signup.nickName,
			fiscalId: signup.fiscalId,
			gender: signup.gender,
			dateOfBirth: signup.dateOfBirth,
			settings: settings,
		};

		return await this.userRepository.create(userProps, tx);
	}

	public async update(userId: string, body: userUpdateType, tx?: Tx): Promise<User> {
		return await this.userRepository.update(userId, body, tx);
	}
}
