import IBaseInterface from './IBaseInterface';

export default interface ISession extends IBaseInterface {
	userId: string;
	token: string;
	retrievedAt: Date;
	expiresAt: Date;
	isActive: boolean;
}
