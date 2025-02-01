import IBaseModel from './IBaseModel';
import IOrder from './interfaces/IOrder';

export default class Order implements IOrder, IBaseModel {
	id: string;
	customer: string;
	deliveryCEP: string;
	productId: string;
	quantity: number;
	total: number;
	createdAt: Date;

	constructor(props: IOrder) {
		this.id = props.id;
		this.customer = props.customer;
		this.deliveryCEP = props.deliveryCEP;
		this.productId = props.productId;
		this.quantity = props.quantity;
		this.total = props.total;
		this.createdAt = props.createdAt;
	}

	public get toDatabase() {
		return {
			id: this.id,
			customer: this.customer,
			deliveryCEP: this.deliveryCEP,
			productId: this.productId,
			quantity: this.quantity,
			total: this.total,
			createdAt: this.createdAt,
		};
	}

	public get toApi(): {} {
		return {
			id: this.id,
			customer: this.customer,
			deliveryCEP: this.deliveryCEP,
			productId: this.productId,
			quantity: this.quantity,
			total: this.total,
			createdAt: this.createdAt,
		};
	}
}
