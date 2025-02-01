import IBaseInterface from './IBaseInterface';

export default interface IOrder extends IBaseInterface {
	id: string;
	customer: string;
	deliveryCEP: string;
	productId: string;
	quantity: number;
	total: number;
	createdAt: Date;
}
