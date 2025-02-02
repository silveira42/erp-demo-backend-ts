import { Context } from 'hono';
import ProductService from '../../../../services/ProductService';
import { Config } from '../../../../app';
import { getInjection } from '../../../../utils/getInjection';
import Tx from '../../../../models/interfaces/Tx';

export const listProducts = (config: Config) => async (c: Context) => {
	try {
		const productService: ProductService = getInjection(ProductService);
		const tx: Tx = c.get('tx');

		const { limit, skip } = c.req.query();

		const products = await productService.list(parseInt(limit), parseInt(skip), tx);
		return c.json(
			products.map((product) => product.toApi),
			200
		);
	} catch (error) {
		return c.json({ error: (error as Error).message }, 500);
	}
};
