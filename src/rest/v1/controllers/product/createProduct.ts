import { Context } from 'hono';
import ProductService from '../../../../services/ProductService';
import { Config } from '../../../../app';
import { getInjection } from '../../../../utils/getInjection';
import Tx from '../../../../models/interfaces/Tx';
import Product from '../../../../models/Product';
import { productCreateSchema, productCreateType } from '../../schemas/product/create';

export const createProduct = (config: Config) => async (c: Context) => {
	try {
		const productService: ProductService = getInjection(ProductService);
		const tx: Tx = c.get('tx');

		const body: productCreateType = await productCreateSchema.validate(await c.req.json());

		const createdProduct: Product = await productService.create(c.get('userId'), body, tx);

		return c.json(createdProduct.toApi, 200);
	} catch (error) {
		return c.json({ error: (error as Error).message }, 500);
	}
};
