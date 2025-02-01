import Product from '../../models/Product';
import Tx from '../../models/interfaces/Tx';
import IProduct from '../../models/interfaces/IProduct';

export default interface IProductRepository {
	create(product: Omit<IProduct, 'id'>, tx?: Tx): Promise<Product>;
	list(tx?: Tx): Promise<Product[]>;
	getByTitle(title: string, tx?: Tx): Promise<Product[]>;
	get(id: string, tx?: Tx): Promise<Product>;
	update(id: string, product: Partial<IProduct>, tx?: Tx): Promise<Product>;
	getByInternalId(internalId: number, tx?: Tx): Promise<Product>;
	delete(id: string, tx?: Tx): Promise<void>;
}
