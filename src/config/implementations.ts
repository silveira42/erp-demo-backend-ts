import { InterfacesConfig } from './InterfacesConfigType';

import UserRepositoryTypeOrm from '../repositories/typeorm/repositories/UserRepositoryTypeOrm';
import SessionRepositoryTypeOrm from '../repositories/typeorm/repositories/SessionRepositoryTypeOrm';
import CredentialRepositoryTypeOrm from '../repositories/typeorm/repositories/CredentialRepositoryTypeOrm';
import ProductRepositoryTypeOrm from '../repositories/typeorm/repositories/ProductRepositoryTypeOrm';
import OrderRepositoryTypeOrm from '../repositories/typeorm/repositories/OrderRepositoryTypeOrm';

const implementations: InterfacesConfig = {
	SessionRepository: SessionRepositoryTypeOrm,
	UserRepository: UserRepositoryTypeOrm,
	CredentialRepository: CredentialRepositoryTypeOrm,
	ProductRepository: ProductRepositoryTypeOrm,
	OrderRepository: OrderRepositoryTypeOrm,
};

export default implementations;
