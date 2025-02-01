import { IsNull, QueryRunner, Repository } from 'typeorm';
import Tx from '../../../models/interfaces/Tx';
import AppDataSource from '../AppDataSource';
import IProductRepository from '../../interfaces/IProductRepository';
import IProduct from '../../../models/interfaces/IProduct';
import Product from '../../../models/Product';
import { ProductTypeOrm } from '../entities/ProductTypeOrm';

export default class ProductRepositoryTypeOrm implements IProductRepository {
	async create(product: Omit<IProduct, 'id'>, tx?: Tx): Promise<Product> {
		try {
			const productTypeOrm: ProductTypeOrm = new ProductTypeOrm();
			productTypeOrm.init(product);

			if (!tx) {
				const productRepository: Repository<ProductTypeOrm> =
					AppDataSource.getRepository(ProductTypeOrm);

				// saving product
				productRepository.save(productTypeOrm);

				return productTypeOrm.toModel;
			} else {
				const queryRunner = tx.core as QueryRunner;

				queryRunner.manager.save(ProductTypeOrm, productTypeOrm);

				return productTypeOrm.toModel;
			}
		} catch (error) {
			throw error;
		}
	}

	async list(tx?: Tx): Promise<Product[]> {
		if (!tx) {
			const productRepository = AppDataSource.getRepository(ProductTypeOrm);

			const product: ProductTypeOrm[] = await productRepository.find({
				where: {
					deletedAt: IsNull(),
				},
			});

			return product.map((product: ProductTypeOrm) => product.toModel);
		} else {
			const queryRunner = tx.core as QueryRunner;

			const product: ProductTypeOrm[] = await queryRunner.manager.findBy(ProductTypeOrm, {
				deletedAt: IsNull(),
			});

			return product.map((product: ProductTypeOrm) => product.toModel);
		}
	}

	getByTitle(title: string, tx?: Tx): Promise<Product[]> {
		throw new Error('Method not implemented.');
	}

	get(id: string, tx?: Tx): Promise<Product> {
		throw new Error('Method not implemented.');
	}

	update(id: string, product: Partial<IProduct>, tx?: Tx): Promise<Product> {
		throw new Error('Method not implemented.');
	}

	getByInternalId(internalId: number, tx?: Tx): Promise<Product> {
		throw new Error('Method not implemented.');
	}

	delete(id: string, tx?: Tx): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
