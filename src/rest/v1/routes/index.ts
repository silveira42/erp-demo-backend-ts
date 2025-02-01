import { Config } from '../../../app';
import { Hono } from 'hono';
import { privateRouter } from './private';
import { publicRouter } from './public';
import { databaseTransaction } from '../middlewares/databaseTransaction';

export const v1Router = (config: Config) => {
	const hono = new Hono<{}>();

	// Default index routes
	hono.get('/', (c) => c.json({ message: 'Welcome home!' }, 200));
	hono.get('/hellothere', (c) => c.json({ message: 'General Keboni!' }, 200));
	hono.notFound((c) => c.json({ message: 'Endpoint Not Found' }, 404));

	// Database transaction middleware
	hono.use('*', databaseTransaction(config));

	// App routes
	hono.route('/public', publicRouter(config));
	hono.route('/', privateRouter(config));

	return hono;
};
