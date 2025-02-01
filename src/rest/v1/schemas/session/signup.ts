import { object, string, number, InferType, date } from 'yup';
import { userSettingsSchema } from '../user/update';
import User from '../../../../models/User';

export const signupSchema = object({
	fullName: string().required(),
	nickName: string().required(),
	fiscalId: string().required(),
	gender: number().required(),
	dateOfBirth: date().required().max(new Date(), 'dateOfBirth may not be in the future'),
	credential: string().required(),
	credentialType: number().required().integer().min(0),
	login: string().required(),
	loginType: number().required().integer().min(0),
	settings: userSettingsSchema.optional().default(User.getDefaultSettings()),
});

export type signupType = InferType<typeof signupSchema>;
