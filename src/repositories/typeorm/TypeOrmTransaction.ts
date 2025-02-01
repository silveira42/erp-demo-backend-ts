import { QueryRunner } from 'typeorm';
import AppDataSource from './AppDataSource';
import Tx from '../../models/interfaces/Tx';

export class TypeOrmTransaction implements Tx {
	core: QueryRunner;

	constructor() {
		this.core = AppDataSource.createQueryRunner();
	}

	async start() {
		await this.core.connect();
		await this.core.startTransaction();
	}

	async commit(): Promise<void> {
		await this.core.commitTransaction();
	}

	async rollback(): Promise<void> {
		await this.core.rollbackTransaction();
	}

	async end(): Promise<void> {
		await this.core.release();
	}
}
