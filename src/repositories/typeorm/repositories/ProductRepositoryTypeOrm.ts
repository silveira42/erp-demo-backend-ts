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

	async list(limit: number, skip: number, tx?: Tx): Promise<Product[]> {
		if (!tx) {
			const productRepository = AppDataSource.getRepository(ProductTypeOrm);

			const product: ProductTypeOrm[] = await productRepository.find({
				where: {
					deletedAt: IsNull(),
				},
				take: limit,
				skip: skip,
			});

			return product.map((product: ProductTypeOrm) => product.toModel);
		} else {
			const queryRunner = tx.core as QueryRunner;

			const product: ProductTypeOrm[] = await queryRunner.manager.find(ProductTypeOrm, {
				where: {
					deletedAt: IsNull(),
				},
				take: limit,
				skip: skip,
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

	async update(id: string, product: Partial<IProduct>, tx?: Tx): Promise<Product> {
		try {
			if (!tx) {
				const productRepository: Repository<ProductTypeOrm> =
					AppDataSource.getRepository(ProductTypeOrm);

				const productToUpdate = await productRepository.findOneByOrFail({
					id: id,
				});

				productToUpdate.update(product);

				await productRepository.save(productToUpdate);

				return productToUpdate.toModel;
			} else {
				const queryRunner = tx.core as QueryRunner;

				const productToUpdate = await queryRunner.manager.findOneByOrFail(ProductTypeOrm, {
					id: id,
				});

				productToUpdate.update(product);

				await queryRunner.manager.save(productToUpdate);

				return productToUpdate.toModel;
			}
		} catch (error: unknown) {
			if (
				(error as Error).message.includes(
					'Could not find any entity of type "ProductTypeOrm" matching:'
				)
			) {
				throw new Error(`Product with id "${id}" not found`);
			}
			throw error;
		}
	}

	getByInternalId(internalId: number, tx?: Tx): Promise<Product> {
		throw new Error('Method not implemented.');
	}

	async delete(id: string, tx?: Tx): Promise<void> {
		try {
			if (!tx) {
				const productRepository: Repository<ProductTypeOrm> =
					AppDataSource.getRepository(ProductTypeOrm);

				const product = await productRepository.findOneByOrFail({ id });

				product.deletedAt = new Date();

				await productRepository.save(product);
			} else {
				const queryRunner = tx.core as QueryRunner;

				const product: ProductTypeOrm = await queryRunner.manager.findOneByOrFail(
					ProductTypeOrm,
					{
						id,
					}
				);

				product.deletedAt = new Date();

				await queryRunner.manager.save(product);
			}
		} catch (error: unknown) {
			if (
				(error as Error).message.includes(
					'Could not find any entity of type "ProductTypeOrm" matching:'
				)
			) {
				throw new Error(`Product with id "${id}" not found`);
			}
			throw error;
		}
	}
}
