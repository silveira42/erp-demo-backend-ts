import { Hono } from 'hono';
import { Config } from '../../../../app';
import { getUser } from '../../controllers/user/getUser';
import { addLogin } from '../../controllers/session/addLogin';
import { updateUser } from '../../controllers/user/updateUser';

export const usersRouter = (services: Config) => {
	const hono = new Hono<{}>();

	hono.get('/', getUser(services));
	hono.post('/addLogin', addLogin(services));
	hono.patch('/', updateUser(services));

	return hono;
};
