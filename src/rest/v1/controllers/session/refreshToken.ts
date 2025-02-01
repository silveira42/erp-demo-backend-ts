import { Context } from 'hono';
import SessionService from '../../../../services/SessionService';
import { Config } from '../../../../app';
import { getInjection } from '../../../../utils/getInjection';
import Tx from '../../../../models/interfaces/Tx';
import { UnofficialStatusCode } from 'hono/utils/http-status';

export const refreshToken = (config: Config) => async (c: Context) => {
	try {
		const sessionService: SessionService = getInjection(SessionService);

		const token = c.req.header('Access-Token');

		if (!token) {
			return c.json({ error: 'Access-Token header is mandatory.' }, 401);
		}

		const tx: Tx = c.get('tx');

		const activeSession = await sessionService.getByToken(token, tx);

		if (!activeSession) {
			return c.json({ error: 'Invalid Token' }, 401);
		}

		if (activeSession.isActive === false) {
			return c.json({ error: 'Session is not active' }, 401);
		}

		const newSession = await sessionService.refreshSession(
			activeSession.id,
			activeSession.userId,
			tx
		);

		return c.json(newSession.toApi, 200);
	} catch (error) {
		let code: number = 500;
		let message: string = (error as Error).message;

		if (message === 'Token has expired.') {
			code = 401;
		} else if (message === 'Token does not exist.') {
			code = 401;
		}

		return c.json({ error: message }, code as UnofficialStatusCode);
	}
};
