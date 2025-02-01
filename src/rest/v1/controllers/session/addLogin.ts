import { Context } from 'hono';
import { addLoginSchema, addLoginType } from '../../schemas/session/addLogin';
import Login from '../../../../models/Login';
import { getInjection } from '../../../../utils/getInjection';
import { Config } from '../../../../app';
import Tx from '../../../../models/interfaces/Tx';
import { UnofficialStatusCode } from 'hono/utils/http-status';
import SessionService from '../../../../services/SessionService';

export const addLogin = (config: Config) => async (c: Context) => {
	try {
		const sessionService = getInjection(SessionService);
		const tx: Tx = c.get('tx');

		const body: addLoginType = await addLoginSchema.validate(await c.req.json());

		const createdLogin: Login = await sessionService.addLogin(
			c.get('userId'),
			body.type,
			body.key,
			tx
		);

		return c.json(createdLogin.toApi, 200);
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
