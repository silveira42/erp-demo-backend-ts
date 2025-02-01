import Order from '../models/Order';
import IOrder from '../models/interfaces/IOrder';
import { GetInjection } from '../utils/getInjection';
import IOrderRepository from '../repositories/interfaces/IOrderRepository';
import Tx from '../models/interfaces/Tx';
import { orderCreateType } from '../rest/v1/schemas/order/create';

export default class OrderService {
	@GetInjection('OrderRepository')
	private orderRepository: IOrderRepository;

	public async create(userId: string, order: orderCreateType, tx?: Tx): Promise<Order> {
		const orderProps: Omit<IOrder, 'id'> = {
			customer: order.customer,
			deliveryCEP: order.deliveryCEP,
			productId: order.productId,
			quantity: order.quantity,
			total: order.total,
			createdAt: new Date(),
		};

		return await this.orderRepository.create(orderProps, tx);
	}

	public async list(tx?: Tx): Promise<Order[]> {
		return await this.orderRepository.list(tx);
	}
}
