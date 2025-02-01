import { Hono } from 'hono';
import { Config } from '../../../../app';
import { createProduct } from '../../controllers/product/createProduct';
import { listProducts } from '../../controllers/product/listProducts';

export const productsRouter = (services: Config) => {
	const hono = new Hono<{}>();

	hono.post('/', createProduct(services));
	hono.get('/', listProducts(services));

	return hono;
};
