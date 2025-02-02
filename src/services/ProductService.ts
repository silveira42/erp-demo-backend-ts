import Product from '../models/Product';
import IProduct from '../models/interfaces/IProduct';
import { GetInjection } from '../utils/getInjection';
import IProductRepository from '../repositories/interfaces/IProductRepository';
import Tx from '../models/interfaces/Tx';
import { productCreateType } from '../rest/v1/schemas/product/create';
import { productUpdateType } from '../rest/v1/schemas/product/update';

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

	public async update(
		userId: string,
		id: string,
		product: productUpdateType,
		tx?: Tx
	): Promise<Product> {
		return await this.productRepository.update(id, product, tx);
	}

	async delete(userId: string, productId: string, tx?: Tx): Promise<void> {
		return await this.productRepository.delete(productId, tx);
	}

	public async list(limit?: number, skip?: number, tx?: Tx): Promise<Product[]> {
		return await this.productRepository.list(limit || 20, skip || 0, tx);
	}
}
