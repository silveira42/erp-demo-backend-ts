import IUser, { UserSettings } from '../../models/interfaces/IUser';
import Tx from '../../models/interfaces/Tx';
import User from '../../models/User';

export default interface IUserRepository {
	create(user: Omit<IUser, 'id'>, tx?: Tx): Promise<User>;
	update(id: string, user: Partial<IUser>, tx?: Tx): Promise<User>;
	get(id: string, tx?: Tx): Promise<User>;
	delete(id: string, tx?: Tx): Promise<void>;
}
