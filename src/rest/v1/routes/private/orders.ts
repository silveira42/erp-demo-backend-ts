import { Hono } from 'hono';
import { Config } from '../../../../app';
import { createOrder } from '../../controllers/order/createOrder';
import { listOrders } from '../../controllers/order/listOrders';

export const ordersRouter = (services: Config) => {
	const hono = new Hono<{}>();

	hono.post('/', createOrder(services));
	hono.get('/', listOrders(services));

	return hono;
};
