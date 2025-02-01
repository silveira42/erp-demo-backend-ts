import {
	BaseEntity,
	Column,
	Entity,
	Generated,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { UserTypeOrm } from './UserTypeOrm';
import Login from '../../../models/Login';
import ILogin, { LoginTypes } from '../../../models/interfaces/ILogin';

@Index('Logins_pkey', ['id'], { unique: true })
@Index('Logins_key_key', ['key'], { unique: true })
@Entity('Logins', { schema: 'public' })
export class LoginTypeOrm extends BaseEntity implements ILogin {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => UserTypeOrm, (users) => users.logins, {
		onDelete: 'RESTRICT',
		onUpdate: 'CASCADE',
	})
	@JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
	user: UserTypeOrm;

	@Column()
	userId: string;

	@Column('enum', {
		name: 'type',
		enum: LoginTypes,
		// transformer due to the fact that the enum is a string in the database
		transformer: {
			to: (value: LoginTypes) => LoginTypes[value],
			from: (value: LoginTypes) => value,
		},
	})
	type: LoginTypes;

	@Column('text', { name: 'key' })
	key: string;

	@Column('timestamp without time zone', { name: 'createdAt' })
	createdAt: Date;

	@Column('timestamp without time zone', { name: 'deletedAt' })
	deletedAt: Date;

	init(props: Omit<ILogin, 'id'>) {
		this.id = crypto.randomUUID();
		this.type = props.type;
		this.key = props.key;
		this.createdAt = new Date();
		this.userId = props.userId;
	}

	public get toModel(): Login {
		return new Login(this);
	}
}
