import { Context } from 'hono';
import UserService from '../../../../services/UserService';
import { Config } from '../../../../app';
import { getInjection } from '../../../../utils/getInjection';
import Tx from '../../../../models/interfaces/Tx';
import { UnofficialStatusCode } from 'hono/utils/http-status';
import { userUpdateSchema, userUpdateType } from '../../schemas/user/update';
import User from '../../../../models/User';

export const updateUser = (config: Config) => async (c: Context) => {
	try {
		const userService = getInjection(UserService);
		const tx: Tx = c.get('tx');

		const body: userUpdateType = await userUpdateSchema.validate(await c.req.json());

		const updatedUser: User = await userService.update(c.get('userId'), body, tx);

		return c.json(updatedUser.toApi, 200);
	} catch (error) {
		return c.json({ error: (error as Error).message }, 500);
	}
};
