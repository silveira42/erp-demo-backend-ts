import { Hono } from 'hono';
import { Config } from '../../../../app';
import { sessionRouter } from './session';

export const publicRouter = (config: Config) => {
	const hono = new Hono<{}>();

	hono.route('/session', sessionRouter(config));
	hono.get('/*', (c) => c.json({ message: 'Not Implemented' }, 404));

	return hono;
};
