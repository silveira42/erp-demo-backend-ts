import IBaseModel from './IBaseModel';
import IProduct from './interfaces/IProduct';

export default class Product implements IProduct, IBaseModel {
	id: string;
	title: string;
	price: number;
	description: string;
	thumbnail: string;
	createdAt?: Date;
	updatedAt?: Date;

	constructor(props: IProduct) {
		this.id = props.id;
		this.title = props.title;
		this.price = props.price;
		this.description = props.description;
		this.thumbnail = props.thumbnail;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	public get toDatabase() {
		return {
			id: this.id,
			title: this.title,
			price: this.price,
			description: this.description,
			thumbnail: this.thumbnail,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}

	public get toApi(): {} {
		return {
			id: this.id,
			title: this.title,
			price: this.price,
			description: this.description,
			thumbnail: this.thumbnail,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
