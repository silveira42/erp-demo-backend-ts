import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Product from '../../../models/Product';
import IProduct from '../../../models/interfaces/IProduct';
import { OrderTypeOrm } from './OrderTypeOrm';

@Index('Products_pkey', ['id'], { unique: true })
@Entity('Products', { schema: 'public' })
export class ProductTypeOrm extends BaseEntity implements IProduct {
	@PrimaryGeneratedColumn('increment')
	pId: number;

	@Column('text')
	id: string;

	@Column('text', { name: 'title' })
	title: string;

	@Column('numeric', { name: 'price' })
	price: number;

	@Column('text', { name: 'description' })
	description: string;

	@Column('text', { name: 'thumbnail' })
	thumbnail: string;

	@Column('text', { name: 'sku' })
	sku?: string;

	@Column('timestamp without time zone', { name: 'createdAt' })
	createdAt: Date;

	@Column('timestamp without time zone', { name: 'updatedAt' })
	updatedAt?: Date | undefined;

	@Column('timestamp without time zone', { name: 'deletedAt', nullable: true })
	deletedAt?: Date;

	@OneToMany(() => OrderTypeOrm, (orders) => orders.product)
	orders: OrderTypeOrm[];

	init(props: Omit<IProduct, 'id'>) {
		this.id = crypto.randomUUID();
		this.title = props.title;
		this.price = props.price;
		this.description = props.description;
		this.thumbnail = props.thumbnail;
		this.sku = props.sku;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	update(props: Partial<IProduct>) {
		this.title = props.title || this.title;
		this.price = props.price || this.price;
		this.description = props.description || this.description;
		this.thumbnail = props.thumbnail || this.thumbnail;
		this.sku = props.sku || this.sku;
		this.updatedAt = new Date();
	}

	public get toModel(): Product {
		return new Product(this);
	}
}
