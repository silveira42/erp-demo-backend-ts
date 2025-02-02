import { Context } from 'hono';
import ProductService from '../../../../services/ProductService';
import { Config } from '../../../../app';
import { getInjection } from '../../../../utils/getInjection';
import Tx from '../../../../models/interfaces/Tx';
import Product from '../../../../models/Product';
import { productUpdateSchema, productUpdateType } from '../../schemas/product/update';

export const updateProduct = (config: Config) => async (c: Context) => {
	try {
		const productService: ProductService = getInjection(ProductService);
		const tx: Tx = c.get('tx');

		const body: productUpdateType = await productUpdateSchema.validate(await c.req.json());
		const productId = c.req.param('productId');

		const updatedProduct: Product = await productService.update(
			c.get('userId'),
			productId,
			body,
			tx
		);

		return c.json(updatedProduct.toApi, 201);
	} catch (error) {
		return c.json({ error: (error as Error).message }, 500);
	}
};
