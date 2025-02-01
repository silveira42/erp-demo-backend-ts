import IBaseInterface from './IBaseInterface';

export default interface ILogin extends IBaseInterface {
	userId: string;
	type: LoginTypes;
	key: string;
	createdAt?: Date;
}

export enum LoginTypes {
	EMAIL,
	PHONE,
	USERNAME,
}
