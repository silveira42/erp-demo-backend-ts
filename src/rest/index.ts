import { Config } from '../app';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { v1Router } from './v1/routes';
import { cors } from 'hono/cors';

const app = new Hono();

export const restService = (config: Config) => {
	// App routes
	app.use('/api/*', cors());
	app.get('/', (c) => c.json({ message: 'Welcome home!' }, 200));
	app.get('/hellothere', (c) => c.json({ message: 'General Keboni!' }, 200));
	app.notFound((c) => c.json({ message: 'Endpoint Not Found' }, 404));

	app.route('/api/v1', v1Router(config));

	serve({
		fetch: app.fetch,
		port: config.port,
	});

	console.log(`App serving on http://0.0.0.0:${config.port}/`);
};

export default app;
