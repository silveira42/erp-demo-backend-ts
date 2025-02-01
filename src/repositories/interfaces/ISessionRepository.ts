import Session from '../../models/Session';
import ISession from '../../models/interfaces/ISession';
import Tx from '../../models/interfaces/Tx';

export default interface ISessionRepository {
	create(session: Omit<ISession, 'id'>, tx?: Tx): Promise<Session>;
	invalidate(userId: string, id: string, tx?: Tx): Promise<Session>;
	list(userId: string, tx?: Tx): Promise<Session[]>;
	getByToken(token: string, tx?: Tx): Promise<Session>;
}
