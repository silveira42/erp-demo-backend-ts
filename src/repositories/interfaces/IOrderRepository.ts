import Order from '../../models/Order';
import Tx from '../../models/interfaces/Tx';
import IOrder from '../../models/interfaces/IOrder';

export default interface IOrderRepository {
	create(order: Omit<IOrder, 'id'>, tx?: Tx): Promise<Order>;
	list(tx?: Tx): Promise<Order[]>;
	get(id: string, tx?: Tx): Promise<Order>;
}
