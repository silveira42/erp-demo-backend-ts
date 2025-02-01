import { Hono } from 'hono';
import { Config } from '../../../../app';
import { usersRouter } from './users';
import { validateToken } from '../../middlewares/validateToken';
import { productsRouter } from './products';
import { ordersRouter } from './orders';

export const privateRouter = (config: Config) => {
	const hono = new Hono<{}>();

	hono.use('*', validateToken(config));

	hono.route('/users', usersRouter(config));
	hono.route('/products', productsRouter(config));
	hono.route('/orders', ordersRouter(config));

	return hono;
};
