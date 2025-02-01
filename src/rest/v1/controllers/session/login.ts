import { Context } from 'hono';
import SessionService from '../../../../services/SessionService';
import Session from '../../../../models/Session';
import { loginSchema, loginType } from '../../schemas/session/login';
import { Config } from '../../../../app';
import { getInjection } from '../../../../utils/getInjection';
import Tx from '../../../../models/interfaces/Tx';
import { UnofficialStatusCode } from 'hono/utils/http-status';

export const login = (config: Config) => async (c: Context) => {
	try {
		const sessionService: SessionService = getInjection(SessionService);
		const tx: Tx = c.get('tx');

		const body: loginType = await loginSchema.validate(await c.req.json());

		const session: Session = await sessionService.login(
			body.credential,
			body.type,
			body.key,
			tx
		);

		return c.json(session.toApi, 200);
	} catch (error) {
		let code: number = 500;
		let message: string = (error as Error).message;

		if (message.includes('is a required field')) {
			code = 400;
		}

		if (message.includes('Login type is invalid')) {
			code = 400;
		}

		return c.json({ error: message }, code as UnofficialStatusCode);
	}
};
