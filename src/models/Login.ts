import IBaseModel from './IBaseModel';
import ILogin, { LoginTypes } from './interfaces/ILogin';

export default class Login implements ILogin, IBaseModel {
	id: string;
	userId: string;
	type: LoginTypes;
	key: string;
	createdAt?: Date;

	constructor(props: ILogin) {
		// Check if the type is a valid value from the LoginTypes enum
		if (!Object.values(LoginTypes).includes(props.type)) {
			throw new Error(`Invalid type: ${props.type}`);
		}

		this.id = props.id;
		this.userId = props.userId;
		this.type = props.type;
		this.key = props.key;
		this.createdAt = props.createdAt;
	}

	public get toApi(): {} {
		return {
			id: this.id,
			type: this.type,
			key: this.key,
			createdAt: this.createdAt,
		};
	}
}
