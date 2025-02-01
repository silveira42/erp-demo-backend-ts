import { Hono } from 'hono';
import { Config } from '../../../../app';
import { login } from '../../controllers/session/login';
import { refreshToken } from '../../controllers/session/refreshToken';
import { signup } from '../../controllers/session/signup';
import { validateToken } from '../../controllers/session/validateToken';

export const sessionRouter = (config: Config) => {
	const hono = new Hono<{}>();

	hono.post('/login', login(config));
	hono.get('/refreshToken', refreshToken(config));
	hono.get('/validateToken', validateToken(config));
	hono.post('/signup', signup(config));

	return hono;
};
