import { Context } from 'hono';
import { Config } from '../../../app';
import { getTransaction } from '../../../utils/getInjection';

export const databaseTransaction = (config: Config) => async (c: Context, next: any) => {
	const tx = getTransaction();
	try {
		await tx.start();
		c.set('tx', tx);
		const result: Context = await next();

		if (result.res.status < 200 || result.res.status >= 300) {
			const error = await result.res.json();
			console.log('error. rolling back transaction: ', error);
			throw new Error(error as string);
		}

		console.log('success. commiting transaction.');
		await tx.commit();
	} catch (error) {
		await tx.rollback();
	} finally {
		await tx.end();
	}
};
