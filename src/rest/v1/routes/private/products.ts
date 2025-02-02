import { Hono } from 'hono';
import { Config } from '../../../../app';
import { createProduct } from '../../controllers/product/createProduct';
import { listProducts } from '../../controllers/product/listProducts';
import { updateProduct } from '../../controllers/product/updateProduct';
import { deleteProduct } from '../../controllers/product/deleteProduct';

export const productsRouter = (services: Config) => {
	const hono = new Hono<{}>();

	hono.post('/', createProduct(services));
	hono.get('/', listProducts(services));
	hono.patch('/:productId', updateProduct(services));
	hono.delete('/:productId', deleteProduct(services));

	return hono;
};
