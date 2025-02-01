import { InterfacesConfig } from './InterfacesConfigType';

import UserRepositoryTypeOrm from '../repositories/typeorm/repositories/UserRepositoryTypeOrm';
import SessionRepositoryTypeOrm from '../repositories/typeorm/repositories/SessionRepositoryTypeOrm';
import CredentialRepositoryTypeOrm from '../repositories/typeorm/repositories/CredentialRepositoryTypeOrm';

const implementations: InterfacesConfig = {
	SessionRepository: SessionRepositoryTypeOrm,
	UserRepository: UserRepositoryTypeOrm,
	CredentialRepository: CredentialRepositoryTypeOrm,
};

export default implementations;
