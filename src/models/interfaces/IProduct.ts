import IBaseInterface from './IBaseInterface';

export default interface IProduct extends IBaseInterface {
	id: string;
	title: string;
	price: number;
	description: string;
	thumbnail: string;
	sku?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
