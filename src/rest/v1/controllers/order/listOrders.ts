import { Context } from 'hono';
import { Config } from '../../../../app';
import { getInjection } from '../../../../utils/getInjection';
import Tx from '../../../../models/interfaces/Tx';
import OrderService from '../../../../services/OrderService';

export const listOrders = (config: Config) => async (c: Context) => {
	try {
		const orderService: OrderService = getInjection(OrderService);
		const tx: Tx = c.get('tx');

		const orders = await orderService.list(tx);
		return c.json(
			orders.map((order) => order.toApi),
			200
		);
	} catch (error) {
		return c.json({ error: (error as Error).message }, 500);
	}
};
