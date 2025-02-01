import IBaseInterface from './IBaseInterface';

export default interface ICredential extends IBaseInterface {
	userId: string;
	type: CredentialTypes;
	value: string;
	status: CredentialStatus;
	createdAt?: Date;
}

export enum CredentialTypes {
	LOGIN,
	GOOGLE,
}

export enum CredentialStatus {
	ACTIVE,
	INACTIVE,
	ARCHIVED,
}
