import { Context } from 'hono';
import SessionService from '../../../../services/SessionService';
import { Config } from '../../../../app';
import { getInjection } from '../../../../utils/getInjection';
import Tx from '../../../../models/interfaces/Tx';
import { UnofficialStatusCode } from 'hono/utils/http-status';

export const validateToken = (config: Config) => async (c: Context) => {
	try {
		const sessionService: SessionService = getInjection(SessionService);

		const token = c.req.header('Access-Token');

		if (!token) {
			return c.json({ error: 'Access-Token header is mandatory.' }, 401);
		}

		const tx: Tx = c.get('tx');

		try {
			const session = await sessionService.getByToken(token, tx);

			if (session.isActive === false) {
				return c.json({ valid: false, error: 'Session is not active' }, 401);
			}

			return c.json({ valid: true }, 200);
		} catch (error) {
			return c.json({ valid: false, error: (error as Error).message }, 401);
		}
	} catch (error) {
		let code: number = 500;
		let message: string = (error as Error).message;

		return c.json({ error: message }, code as UnofficialStatusCode);
	}
};
