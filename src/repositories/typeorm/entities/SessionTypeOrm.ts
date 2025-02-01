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
import ISession from '../../../models/interfaces/ISession';
import Session from '../../../models/Session';

@Index('Sessions_pkey', ['id'], { unique: true })
@Index('Sessions_token_key', ['token'], { unique: true })
@Entity('Sessions', { schema: 'public' })
export class SessionTypeOrm extends BaseEntity implements ISession {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => UserTypeOrm, (users) => users.sessions)
	@JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
	user: UserTypeOrm;

	@Column()
	userId: string;

	@Column('text', { name: 'token' })
	token: string;

	@Column('timestamp without time zone', { name: 'retrievedAt' })
	retrievedAt: Date;

	@Column('timestamp without time zone', { name: 'expiresAt' })
	expiresAt: Date;

	@Column('boolean', { name: 'isActive' })
	isActive: boolean;

	init(session: Omit<ISession, 'id'>) {
		this.id = crypto.randomUUID();
		this.token = session.token;
		this.retrievedAt = session.retrievedAt;
		this.expiresAt = session.expiresAt;
		this.isActive = session.isActive;
		this.userId = session.userId;
	}

	public get toModel(): Session {
		return new Session(this);
	}
}
