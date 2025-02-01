import { QueryRunner, Repository } from 'typeorm';
import Tx from '../../../models/interfaces/Tx';
import Session from '../../../models/Session';
import ISessionRepository from '../../interfaces/ISessionRepository';
import { SessionTypeOrm } from '../entities/SessionTypeOrm';
import AppDataSource from '../AppDataSource';
import ISession from '../../../models/interfaces/ISession';

export default class SessionRepositoryTypeOrm implements ISessionRepository {
	async create(session: Omit<ISession, 'id'>, tx?: Tx): Promise<Session> {
		try {
			const sessionTypeOrm: SessionTypeOrm = new SessionTypeOrm();
			sessionTypeOrm.init(session);

			if (!tx) {
				const sessionRepository: Repository<SessionTypeOrm> =
					AppDataSource.getRepository(SessionTypeOrm);

				await sessionRepository.save(sessionTypeOrm);

				return sessionTypeOrm.toModel;
			} else {
				const queryRunner = tx.core as QueryRunner;

				await queryRunner.manager.save(sessionTypeOrm);

				return sessionTypeOrm.toModel;
			}
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async invalidate(userId: string, id: string, tx?: Tx): Promise<Session> {
		const sessionTypeOrm: SessionTypeOrm = new SessionTypeOrm();
		sessionTypeOrm.id = id;
		sessionTypeOrm.userId = userId;
		sessionTypeOrm.isActive = false;

		if (!tx) {
			const sessionRepository: Repository<SessionTypeOrm> =
				AppDataSource.getRepository(SessionTypeOrm);

			await sessionRepository.save(sessionTypeOrm);

			return sessionTypeOrm.toModel;
		} else {
			const queryRunner = tx.core as QueryRunner;

			await queryRunner.manager.save(sessionTypeOrm);

			return sessionTypeOrm.toModel;
		}
	}

	async list(userId: string, tx?: Tx): Promise<Session[]> {
		if (!tx) {
			const sessionRepository = AppDataSource.getRepository(SessionTypeOrm);

			const sessions: SessionTypeOrm[] = await sessionRepository.findBy({
				userId,
				isActive: true,
			});

			return sessions.map((session: SessionTypeOrm) => session.toModel);
		} else {
			const queryRunner = tx.core as QueryRunner;

			const sessions: SessionTypeOrm[] = await queryRunner.manager.findBy(SessionTypeOrm, {
				userId,
				isActive: true,
			});

			return sessions.map((session: SessionTypeOrm) => session.toModel);
		}
	}

	async getByToken(token: string, tx?: Tx): Promise<Session> {
		if (!tx) {
			const sessionRepository = AppDataSource.getRepository(SessionTypeOrm);

			const session: SessionTypeOrm = await sessionRepository.findOneByOrFail({
				token: token,
			});

			return session.toModel;
		} else {
			const queryRunner = tx.core as QueryRunner;

			const session: SessionTypeOrm = await queryRunner.manager.findOneByOrFail(
				SessionTypeOrm,
				{
					token: token,
				}
			);

			return session.toModel;
		}
	}

	async delete(userId: string, id: string, tx?: Tx): Promise<void> {
		if (!tx) {
			const sessionRepository = AppDataSource.getRepository(SessionTypeOrm);

			await sessionRepository.delete({ userId, id });
		} else {
			const queryRunner = tx.core as QueryRunner;

			await queryRunner.manager.delete(SessionTypeOrm, { userId, id });
		}
	}
}
