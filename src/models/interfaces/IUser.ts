import IBaseInterface from './IBaseInterface';
import ILogin from './ILogin';

export default interface IUser extends IBaseInterface {
	fullName: string;
	nickName: string;
	fiscalId: string;
	gender: GenderTypes;
	dateOfBirth: Date;
	settings: UserSettings;
	createdAt?: Date;
	updatedAt?: Date;
	logins?: ILogin[];
}

export enum GenderTypes {
	NOTDECLARED,
	WOMAN,
	MAN,
	NONBINARY,
}

export type UserPeriodSettings = {
	yearInterval: number;
	monthInterval: number;
	weekInterval: number;
	dayInterval: number;
};

export type UserSettings = {
	period: UserPeriodSettings;
};
