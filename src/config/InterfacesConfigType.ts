import { Implementation } from './ImplementationType';

import ISessionRepository from '../repositories/interfaces/ISessionRepository';
import IUserRepository from '../repositories/interfaces/IUserRepository';
import ICredentialRepository from '../repositories/interfaces/ICredentialRepository';

export type InterfacesConfig = {
	CredentialRepository: Implementation<ICredentialRepository>;
	SessionRepository: Implementation<ISessionRepository>;
	UserRepository: Implementation<IUserRepository>;
};
