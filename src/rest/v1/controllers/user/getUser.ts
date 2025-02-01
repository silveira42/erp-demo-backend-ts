import { Context } from 'hono';
import UserService from '../../../../services/UserService';
import { Config } from '../../../../app';
import { getInjection } from '../../../../utils/getInjection';
import Tx from '../../../../models/interfaces/Tx';
import { UnofficialStatusCode } from 'hono/utils/http-status';

export const getUser = (config: Config) => async (c: Context) => {
	try {
		const userService: UserService = getInjection(UserService);
		const tx: Tx = c.get('tx');

		const userId = c.get('userId');
		const user = await userService.get(userId, tx);
		return c.json(user.toApi, 200);
	} catch (error) {
		return c.json({ error: (error as Error).message }, 500);
	}
};
