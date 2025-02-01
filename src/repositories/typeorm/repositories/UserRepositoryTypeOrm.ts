import { IsNull, QueryRunner, Repository } from 'typeorm';
import IUserRepository from '../../interfaces/IUserRepository';
import AppDataSource from '../AppDataSource';
import { UserTypeOrm } from '../entities/UserTypeOrm';
import Tx from '../../../models/interfaces/Tx';
import User from '../../../models/User';
import IUser from '../../../models/interfaces/IUser';
import { LoginTypeOrm } from '../entities/LoginTypeOrm';

export default class UserRepositoryTypeOrm implements IUserRepository {
	async create(user: Omit<IUser, 'id'>, tx?: Tx): Promise<User> {
		const userTypeOrm: UserTypeOrm = new UserTypeOrm();
		userTypeOrm.init(user);

		if (!tx) {
			const userRepository: Repository<UserTypeOrm> =
				AppDataSource.getRepository(UserTypeOrm);

			await userRepository.save(userTypeOrm);

			return userTypeOrm.toModel;
		} else {
			const queryRunner = tx.core as QueryRunner;

			await queryRunner.manager.save(UserTypeOrm, userTypeOrm);

			return userTypeOrm.toModel;
		}
	}

	async update(userId: string, user: Partial<IUser>, tx?: Tx): Promise<User> {
		if (!tx) {
			const userRepository: Repository<UserTypeOrm> =
				AppDataSource.getRepository(UserTypeOrm);

			const userToUpdate: UserTypeOrm = await userRepository.findOneByOrFail({ id: userId });

			userToUpdate.update(user);

			await userRepository.save(userToUpdate);

			return userToUpdate.toModel;
		} else {
			const queryRunner = tx.core as QueryRunner;

			const userToUpdate: UserTypeOrm = await queryRunner.manager.findOneByOrFail(
				UserTypeOrm,
				{
					id: userId,
				}
			);

			userToUpdate.update(user);

			await queryRunner.manager.save(userToUpdate);

			return userToUpdate.toModel;
		}
	}

	async list(): Promise<User[]> {
		const userRepository = AppDataSource.getRepository(UserTypeOrm);

		const users: UserTypeOrm[] = await userRepository.find();

		return users.map((user: UserTypeOrm) => user.toModel);
	}

	async get(id: string, tx?: Tx): Promise<User> {
		if (!tx) {
			const userRepository = AppDataSource.getRepository(UserTypeOrm);
			const loginRepository = AppDataSource.getRepository(LoginTypeOrm);
			const user: UserTypeOrm = await userRepository.findOneByOrFail({ id: id });

			user.logins = (
				await loginRepository.findBy({
					userId: user.id,
					deletedAt: IsNull(),
				})
			).map((login) => login.toModel);

			return user.toModel;
		} else {
			const queryRunner = tx.core as QueryRunner;

			const user: UserTypeOrm = await queryRunner.manager.findOneByOrFail(UserTypeOrm, {
				id: id,
			});

			user.logins = (
				await queryRunner.manager.findBy(LoginTypeOrm, {
					userId: user.id,
					deletedAt: IsNull(),
				})
			).map((login) => login.toModel);

			return user.toModel;
		}
	}

	async delete(id: string, tx?: Tx): Promise<void> {
		if (!tx) {
			const userRepository: Repository<UserTypeOrm> =
				AppDataSource.getRepository(UserTypeOrm);

			const user = await userRepository.findOneByOrFail({ id });

			user.deletedAt = new Date();

			await userRepository.save(user);
		} else {
			const queryRunner = tx.core as QueryRunner;

			const user: UserTypeOrm = await queryRunner.manager.findOneByOrFail(UserTypeOrm, {
				id: id,
			});

			user.deletedAt = new Date();

			await queryRunner.manager.save(user);
		}
	}
}
