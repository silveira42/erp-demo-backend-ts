import IBaseModel from './IBaseModel';
import ISession from './interfaces/ISession';

export default class Session implements ISession, IBaseModel {
	id: string;
	userId: string;
	token: string;
	retrievedAt: Date;
	expiresAt: Date;
	isActive: boolean;

	constructor(props: ISession) {
		this.id = props.id;
		this.userId = props.userId;
		this.token = props.token;
		this.retrievedAt = props.retrievedAt;
		this.expiresAt = props.expiresAt;
		this.isActive = props.isActive;
	}

	public get toApi(): {} {
		return {
			userId: this.userId,
			token: this.token,
			retrievedAt: this.retrievedAt,
			expiresAt: this.expiresAt,
			isActive: this.isActive,
		};
	}
}
