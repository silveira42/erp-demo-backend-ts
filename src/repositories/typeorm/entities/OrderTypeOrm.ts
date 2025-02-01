import {
	BaseEntity,
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import IOrder from '../../../models/interfaces/IOrder';
import Order from '../../../models/Order';
import { ProductTypeOrm } from './ProductTypeOrm';

@Index('Orders_pkey', ['id'], { unique: true })
@Entity('Orders', { schema: 'public' })
export class OrderTypeOrm extends BaseEntity implements IOrder {
	@PrimaryGeneratedColumn('increment')
	pId: number;

	@Column('text')
	id: string;

	@Column('text', { name: 'customer' })
	customer: string;

	@Column('text', { name: 'deliveryCEP' })
	deliveryCEP: string;

	@Column('numeric', { name: 'quantity' })
	quantity: number;

	@Column('numeric', { name: 'total' })
	total: number;

	@Column('timestamp without time zone', { name: 'createdAt' })
	createdAt: Date;

	@ManyToOne(() => ProductTypeOrm, (products) => products.orders)
	@JoinColumn([{ name: 'productPId', referencedColumnName: 'pId' }])
	product: ProductTypeOrm;

	productId: string;

	@Column('integer', { name: 'productPId' })
	productPId: number;

	init(props: Omit<IOrder, 'id'>) {
		this.id = crypto.randomUUID();
		this.customer = props.customer;
		this.deliveryCEP = props.deliveryCEP;
		this.productId = props.productId;
		this.quantity = props.quantity;
		this.total = props.total;
		this.createdAt = new Date();
	}

	public get toModel(): Order {
		return new Order(this);
	}
}
