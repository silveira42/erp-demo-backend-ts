import Product from '../models/Product';
import IProduct from '../models/interfaces/IProduct';
import { GetInjection } from '../utils/getInjection';
import IProductRepository from '../repositories/interfaces/IProductRepository';
import Tx from '../models/interfaces/Tx';
import { productCreateType } from '../rest/v1/schemas/product/create';

export default class ProductService {
	@GetInjection('ProductRepository')
	private productRepository: IProductRepository;

	public async create(userId: string, product: productCreateType, tx?: Tx): Promise<Product> {
		const productProps: Omit<IProduct, 'id'> = {
			title: product.title,
			price: product.price,
			description: product.description,
			thumbnail: product.thumbnail,
			sku: product.sku,
		};

		return await this.productRepository.create(productProps, tx);
	}

	public async list(tx?: Tx): Promise<Product[]> {
		return await this.productRepository.list(tx);
	}
}
