import Credential from '../../models/Credential';
import ICredential, {
	CredentialStatus,
	CredentialTypes,
} from '../../models/interfaces/ICredential';
import ILogin from '../../models/interfaces/ILogin';
import Login from '../../models/Login';
import Tx from '../../models/interfaces/Tx';

export default interface ICredentialRepository {
	create(credential: Omit<ICredential, 'id'>, tx?: Tx): Promise<Credential>;
	addLogin(login: Omit<ILogin, 'id'>, tx?: Tx): Promise<Login>;
	changeStatus(
		userId: string,
		id: string,
		newStatus: CredentialStatus,
		tx?: Tx
	): Promise<Credential>;
	loginByType(value: string, type: CredentialTypes, tx?: Tx): Promise<string>;
	loginByKey(value: string, key: string, tx?: Tx): Promise<string>;
	delete(userId: string, id: string, tx?: Tx): Promise<void>;
}
