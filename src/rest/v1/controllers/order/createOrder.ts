import { Context } from 'hono';
import { Config } from '../../../../app';
import { getInjection } from '../../../../utils/getInjection';
import Tx from '../../../../models/interfaces/Tx';
import Order from '../../../../models/Order';
import { orderCreateSchema, orderCreateType } from '../../schemas/order/create';
import OrderService from '../../../../services/OrderService';

export const createOrder = (config: Config) => async (c: Context) => {
	try {
		const orderService: OrderService = getInjection(OrderService);
		const tx: Tx = c.get('tx');

		const body: orderCreateType = await orderCreateSchema.validate(await c.req.json());

		const createdOrder: Order = await orderService.create(c.get('userId'), body, tx);

		return c.json(createdOrder.toApi, 200);
	} catch (error) {
		return c.json({ error: (error as Error).message }, 500);
	}
};
