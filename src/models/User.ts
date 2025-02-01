import IBaseModel from './IBaseModel';
import Login from './Login';
import IUser, { GenderTypes, UserSettings } from './interfaces/IUser';

export default class User implements IUser, IBaseModel {
	id: string;
	fullName: string;
	nickName: string;
	fiscalId: string;
	gender: GenderTypes;
	dateOfBirth: Date;
	settings: UserSettings;
	createdAt?: Date;
	updatedAt?: Date;
	logins?: Login[];

	constructor(props: IUser) {
		this.id = props.id;
		this.fullName = props.fullName;
		this.nickName = props.nickName;
		this.fiscalId = props.fiscalId;
		this.gender = props.gender;
		this.dateOfBirth = props.dateOfBirth;
		this.settings = props.settings;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
		this.logins = props.logins?.map((login) => new Login(login));
	}

	public get toApi(): {} {
		return {
			id: this.id,
			fullName: this.fullName,
			nickName: this.nickName,
			fiscalId: this.fiscalId,
			gender: this.gender,
			dateOfBirth: this.dateOfBirth,
			settings: this.settings,
			logins: this.logins?.map((login) => login.toApi),
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}

	public static getDefaultSettings(): UserSettings {
		const userSettings: UserSettings = {
			period: {
				yearInterval: 0,
				monthInterval: 1,
				weekInterval: 0,
				dayInterval: 0,
			},
		};

		return userSettings;
	}

	public getNextPeriodClosesAt(opensAt: Date): Date {
		const interval = opensAt;
		const period = this.settings.period;

		if (period.yearInterval) {
			interval.setFullYear(interval.getFullYear() + period.yearInterval);
		} else if (period.monthInterval) {
			interval.setMonth(interval.getMonth() + period.monthInterval);
			if (period.dayInterval) {
				interval.setDate(interval.getDate() + period.dayInterval);
			}
		} else if (period.weekInterval) {
			interval.setDate(interval.getDate() + period.weekInterval * 7);
		} else if (period.dayInterval) {
			interval.setDate(interval.getDate() + period.dayInterval);
		}

		return interval;
	}
}
