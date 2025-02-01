import IBaseModel from './IBaseModel';
import ICredential, { CredentialStatus, CredentialTypes } from './interfaces/ICredential';

export default class Credential implements ICredential, IBaseModel {
	id: string;
	userId: string;
	type: CredentialTypes;
	value: string;
	status: CredentialStatus;
	createdAt?: Date;

	constructor(props: ICredential) {
		this.id = props.id;
		this.userId = props.userId;
		this.type = props.type;
		this.value = props.value;
		this.createdAt = props.createdAt;
		this.status = props.status;
	}

	public get toDatabase() {
		return {
			id: this.id,
			userId: this.userId,
			type: this.type,
			value: this.value,
			status: this.status,
			createdAt: this.createdAt,
		};
	}

	public get toApi(): {} {
		return {};
	}
}
