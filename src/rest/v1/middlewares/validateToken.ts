import { Context } from 'hono';
import SessionService from '../../../services/SessionService';
import { getInjection } from '../../../utils/getInjection';
import { Config } from '../../../app';
import { StatusCode } from 'hono/utils/http-status';

export const validateToken = (config: Config) => async (c: Context, next: any) => {
	try {
		const token = c.req.header('Access-Token');
		const apiToken = c.req.header('Api-Token');

		const sessionService = getInjection(SessionService);

		if (!token && !apiToken) {
			return c.json({ error: 'Access-Token or Api-Token header is mandatory.' }, 401);
		}

		if (token) {
			// if default token
			const activeSession = await sessionService.getByToken(token);

			c.set('userId', activeSession.userId);
		} else {
			// if api token
			if (apiToken !== config.apiToken) {
				return c.json({ error: 'Invalid API Token.' }, 401);
			}
		}

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
