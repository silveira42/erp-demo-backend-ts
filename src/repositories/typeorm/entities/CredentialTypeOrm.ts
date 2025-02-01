import {
	BaseEntity,
	Column,
	Entity,
	Generated,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTypeOrm } from './UserTypeOrm';
import ICredential, {
	CredentialStatus,
	CredentialTypes,
} from '../../../models/interfaces/ICredential';
import Credential from '../../../models/Credential';

@Index('Credentials_pkey', ['id'], { unique: true })
@Entity('Credentials', { schema: 'public' })
export class CredentialTypeOrm extends BaseEntity implements ICredential {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => UserTypeOrm, (users) => users.credentials, {
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
	user: UserTypeOrm;

	@Column()
	userId: string;

	@Column('enum', {
		name: 'type',
		enum: CredentialTypes,
		// transformer due to the fact that the enum is a string in the database
		transformer: {
			to: (value: CredentialTypes) => CredentialTypes[value],
			from: (value: CredentialTypes) => value,
		},
	})
	type: CredentialTypes;

	@Column('text', { name: 'value' })
	value: string;

	@Column('enum', {
		name: 'status',
		enum: CredentialStatus,
		// transformer due to the fact that the enum is a string in the database
		transformer: {
			to: (value: CredentialStatus) => CredentialStatus[value],
			from: (value: CredentialStatus) => value,
		},
	})
	status: CredentialStatus;

	@Column('timestamp without time zone', { name: 'createdAt' })
	createdAt: Date;

	@Column('timestamp without time zone', { name: 'deletedAt' })
	deletedAt: Date;

	init(props: Omit<ICredential, 'id'>) {
		this.id = crypto.randomUUID();
		this.userId = props.userId;
		this.type = props.type;
		this.value = props.value;
		this.status = props.status;
		this.createdAt = new Date();
	}

	public get toModel(): Credential {
		return new Credential(this);
	}
}
