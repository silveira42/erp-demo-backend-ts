import { Context } from 'hono';
import ProductService from '../../../../services/ProductService';
import { getInjection } from '../../../../utils/getInjection';
import { Config } from '../../../../app';
import Tx from '../../../../models/interfaces/Tx';
import { UnofficialStatusCode } from 'hono/utils/http-status';

export const deleteProduct = (config: Config) => async (c: Context) => {
	try {
		const productService: ProductService = getInjection(ProductService);

		const productId = c.req.param('productId');
		const tx: Tx = c.get('tx');

		const deletedProductId = await productService.delete(c.get('userId'), productId, tx);

		return c.json({ productId: deletedProductId }, 200);
	} catch (error) {
		let code: number = 500;
		let message: string = (error as Error).message;

		return c.json({ error: message }, code as UnofficialStatusCode);
	}
};
