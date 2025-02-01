import { object, string, number, date, InferType } from 'yup';

// Define the UserPeriodSettings schema
export const userPeriodSettingsSchema = object({
	yearInterval: number().required(),
	monthInterval: number().required(),
	weekInterval: number().required(),
	dayInterval: number().required(),
});

// Define the UserSettings schema
export const userSettingsSchema = object({
	theme: string().optional(),
	period: userPeriodSettingsSchema.required(),
});

export const userUpdateSchema = object({
	fullName: string().optional(),
	nickName: string().optional(),
	fiscalId: string().optional(),
	gender: number().optional(),
	dateOfBirth: date().optional().max(new Date(), 'dateOfBirth may not be in the future'),
	settings: userSettingsSchema.optional(),
});

export type userUpdateType = InferType<typeof userUpdateSchema>;
