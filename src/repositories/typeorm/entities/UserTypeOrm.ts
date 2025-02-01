import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LoginTypeOrm } from './LoginTypeOrm';
import { CredentialTypeOrm } from './CredentialTypeOrm';
import { SessionTypeOrm } from './SessionTypeOrm';
import User from '../../../models/User';
import IUser, { GenderTypes, UserSettings } from '../../../models/interfaces/IUser';
import Login from '../../../models/Login';

@Index('Users_pkey', ['id'], { unique: true })
@Entity('Users', { schema: 'public' })
export class UserTypeOrm extends BaseEntity implements IUser {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text', { name: 'fiscalId' })
	fiscalId: string;

	@Column('text', { name: 'fullName' })
	fullName: string;

	@Column('text', { name: 'nickName' })
	nickName: string;

	@Column('enum', {
		name: 'gender',
		enum: GenderTypes,
		// transformer due to the fact that the enum is a string in the database
		transformer: {
			to: (value: GenderTypes) => GenderTypes[value],
			from: (value: GenderTypes) => value,
		},
	})
	gender: GenderTypes;

	@Column('timestamp without time zone', { name: 'dateOfBirth' })
	dateOfBirth: Date;

	@Column('text', { name: 'settings' })
	settings: UserSettings;

	@Column('timestamp without time zone', { name: 'createdAt' })
	createdAt: Date;

	@Column('timestamp without time zone', { name: 'updatedAt' })
	updatedAt: Date;

	@Column('timestamp without time zone', { name: 'deletedAt' })
	deletedAt: Date;

	@OneToMany(() => LoginTypeOrm, (logins) => logins.user)
	logins: Login[];

	@OneToMany(() => CredentialTypeOrm, (credentials) => credentials.user)
	credentials: CredentialTypeOrm[];

	@OneToMany(() => SessionTypeOrm, (sessions) => sessions.user)
	sessions: SessionTypeOrm[];

	init(props: Omit<IUser, 'id'>) {
		this.id = crypto.randomUUID();
		this.fiscalId = props.fiscalId;
		this.fullName = props.fullName;
		this.nickName = props.nickName;
		this.gender = props.gender;
		this.dateOfBirth = props.dateOfBirth;
		this.settings = props.settings;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	update(props: Partial<IUser>) {
		this.fiscalId = props.fiscalId || this.fiscalId;
		this.fullName = props.fullName || this.fullName;
		this.nickName = props.nickName || this.nickName;
		this.gender = props.gender || this.gender;
		this.dateOfBirth = props.dateOfBirth || this.dateOfBirth;
		this.settings = props.settings || this.settings;
		this.updatedAt = new Date();
	}

	public get toModel(): User {
		return new User(this);
	}
}
