import { Context } from 'hono';
import SessionService from '../../../services/SessionService';
import { getInjection } from '../../../utils/getInjection';
import { Config } from '../../../app';
import { StatusCode } from 'hono/utils/http-status';

export const validateToken = (config: Config) => async (c: Context, next: any) => {
	try {
		const token = c.req.header('Access-Token');

		const sessionService = getInjection(SessionService);

		if (!token) {
			return c.json({ error: 'Access-Token header is mandatory.' }, 401);
		}

		const activeSession = await sessionService.getByToken(token);

		c.set('userId', activeSession.userId);

		await next();
	} catch (error) {
		let code: number = 500;
		let message: string = (error as Error).message;

		if (message.includes('Token does not exist')) {
			message = 'Invalid token.';
			code = 401;
		}

		if (message.includes('Access denied')) {
			code = 403;
		}

		return c.json({ error: message }, code as StatusCode);
	}
};
