import { QueryRunner, Repository } from 'typeorm';
import Tx from '../../../models/interfaces/Tx';
import AppDataSource from '../AppDataSource';
import ICredentialRepository from '../../interfaces/ICredentialRepository';
import { CredentialTypeOrm } from '../entities/CredentialTypeOrm';
import Credential from '../../../models/Credential';
import { CredentialStatus, CredentialTypes } from '../../../models/interfaces/ICredential';
import ILogin from '../../../models/interfaces/ILogin';
import Login from '../../../models/Login';
import { LoginTypeOrm } from '../entities/LoginTypeOrm';

export default class CredentialRepositoryTypeOrm implements ICredentialRepository {
	async create(credential: Omit<Credential, 'id'>, tx?: Tx): Promise<Credential> {
		const credentialTypeOrm: CredentialTypeOrm = new CredentialTypeOrm();
		credentialTypeOrm.init(credential);

		if (!tx) {
			const credentialRepository: Repository<CredentialTypeOrm> =
				AppDataSource.getRepository(CredentialTypeOrm);

			await credentialRepository.save(credentialTypeOrm);

			return credentialTypeOrm.toModel;
		} else {
			const queryRunner = tx.core as QueryRunner;

			await queryRunner.manager.save(CredentialTypeOrm, credentialTypeOrm);

			return credentialTypeOrm.toModel;
		}
	}

	async addLogin(login: Omit<ILogin, 'id'>, tx?: Tx): Promise<Login> {
		const loginTypeOrm: LoginTypeOrm = new LoginTypeOrm();
		loginTypeOrm.init(login);

		if (!tx) {
			const loginRepository: Repository<LoginTypeOrm> =
				AppDataSource.getRepository(LoginTypeOrm);

			loginRepository.save(loginTypeOrm);

			return loginTypeOrm.toModel;
		} else {
			const queryRunner = tx.core as QueryRunner;

			queryRunner.manager.save(LoginTypeOrm, loginTypeOrm);

			return loginTypeOrm.toModel;
		}
	}

	async changeStatus(
		userId: string,
		id: string,
		newStatus: CredentialStatus,
		tx?: Tx
	): Promise<Credential> {
		if (!tx) {
			const credentialRepository = AppDataSource.getRepository(CredentialTypeOrm);

			const credential = await credentialRepository.findOneByOrFail({ userId, id });

			await credentialRepository.update(credential.id, { status: newStatus });

			return credential.toModel;
		} else {
			const queryRunner = tx.core as QueryRunner;

			const credential: CredentialTypeOrm = await queryRunner.manager.findOneByOrFail(
				CredentialTypeOrm,
				{
					userId,
					id,
				}
			);

			credential.status = newStatus;

			await queryRunner.manager.save(credential);

			return credential.toModel;
		}
	}

	async loginByType(value: string, type: CredentialTypes, tx?: Tx): Promise<string> {
		try {
			if (!tx) {
				const credentialRepository = AppDataSource.getRepository(CredentialTypeOrm);

				const credential = await credentialRepository.findOneByOrFail({ value, type });

				return credential.userId;
			} else {
				const queryRunner = tx.core as QueryRunner;

				const credential: CredentialTypeOrm = await queryRunner.manager.findOneByOrFail(
					CredentialTypeOrm,
					{
						value,
						type,
					}
				);

				return credential.userId;
			}
		} catch (error: unknown) {
			if (
				(error as Error).message.includes(
					'Could not find any entity of type "CredentialTypeOrm" matching:'
				)
			) {
				throw new Error(`Invalid credentials.`);
			}
			throw error;
		}
	}

	async loginByKey(value: string, key: string, tx?: Tx): Promise<string> {
		try {
			if (!tx) {
				const loginRepository = AppDataSource.getRepository(LoginTypeOrm);
				const credentialRepository = AppDataSource.getRepository(CredentialTypeOrm);

				const login = await loginRepository.findOneByOrFail({ key });

				const credential = await credentialRepository.findOneByOrFail({
					userId: login.userId,
					value,
				});

				return credential.userId;
			} else {
				const queryRunner = tx.core as QueryRunner;

				const login: LoginTypeOrm = await queryRunner.manager.findOneByOrFail(
					LoginTypeOrm,
					{
						key,
					}
				);

				const credential: CredentialTypeOrm = await queryRunner.manager.findOneByOrFail(
					CredentialTypeOrm,
					{
						userId: login.userId,
						value,
					}
				);

				return credential.userId;
			}
		} catch (error: unknown) {
			if (
				(error as Error).message.includes(
					'Could not find any entity of type "LoginTypeOrm" matching:'
				)
			) {
				throw new Error(`Invalid login key ${key}.`);
			}
			if (
				(error as Error).message.includes(
					'Could not find any entity of type "CredentialTypeOrm" matching:'
				)
			) {
				throw new Error(`Invalid credentials.`);
			}
			throw error;
		}
	}

	async delete(userId: string, id: string, tx?: Tx): Promise<void> {
		if (!tx) {
			const credentialRepository = AppDataSource.getRepository(CredentialTypeOrm);

			const credential = await credentialRepository.findOneByOrFail({ userId, id });

			await credentialRepository.update(credential.id, { status: CredentialStatus.ARCHIVED });
		} else {
			const queryRunner = tx.core as QueryRunner;

			const credential: CredentialTypeOrm = await queryRunner.manager.findOneByOrFail(
				CredentialTypeOrm,
				{
					userId,
					id,
				}
			);

			credential.status = CredentialStatus.ARCHIVED;

			await queryRunner.manager.save(credential);
		}
	}
}
