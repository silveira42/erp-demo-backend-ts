import { IsNull, QueryRunner, Repository } from 'typeorm';
import Tx from '../../../models/interfaces/Tx';
import AppDataSource from '../AppDataSource';
import IOrderRepository from '../../interfaces/IOrderRepository';
import IOrder from '../../../models/interfaces/IOrder';
import Order from '../../../models/Order';
import { OrderTypeOrm } from '../entities/OrderTypeOrm';
import { ProductTypeOrm } from '../entities/ProductTypeOrm';

export default class OrderRepositoryTypeOrm implements IOrderRepository {
	async create(order: Omit<IOrder, 'id'>, tx?: Tx): Promise<Order> {
		try {
			const orderTypeOrm: OrderTypeOrm = new OrderTypeOrm();
			orderTypeOrm.init(order);

			if (!tx) {
				const orderRepository: Repository<OrderTypeOrm> =
					AppDataSource.getRepository(OrderTypeOrm);

				// validating product
				await AppDataSource.getRepository(ProductTypeOrm).findOneByOrFail({
					id: order.productId,
					deletedAt: IsNull(),
				});

				// saving order
				orderRepository.save(orderTypeOrm);

				return orderTypeOrm.toModel;
			} else {
				const queryRunner = tx.core as QueryRunner;

				// validating product
				await queryRunner.manager.findOneByOrFail(ProductTypeOrm, {
					id: order.productId,
					deletedAt: IsNull(),
				});

				queryRunner.manager.save(OrderTypeOrm, orderTypeOrm);

				return orderTypeOrm.toModel;
			}
		} catch (error) {
			if (
				(error as Error).message.includes(
					'Could not find any entity of type "ProductTypeOrm" matching'
				)
			) {
				throw new Error('Product not found.');
			}
			throw error;
		}
	}

	async list(tx?: Tx): Promise<Order[]> {
		try {
			if (!tx) {
				const orderRepository = AppDataSource.getRepository(OrderTypeOrm);

				const orders: OrderTypeOrm[] = await orderRepository.find({
					where: {
						deletedAt: IsNull(),
					},
				});

				return orders.map((order: OrderTypeOrm) => order.toModel);
			} else {
				const queryRunner = tx.core as QueryRunner;

				const orders: OrderTypeOrm[] = await queryRunner.manager.findBy(OrderTypeOrm, {
					deletedAt: IsNull(),
				});

				return orders.map((order: OrderTypeOrm) => order.toModel);
			}
		} catch (error: unknown) {
			if (
				(error as Error).message.includes(
					'Could not find any entity of type "Order" matching:'
				)
			) {
				throw new Error(`Invalid credentials.`);
			}
			throw error;
		}
	}

	get(id: string, tx?: Tx): Promise<Order> {
		throw new Error('Method not implemented.');
	}
}
