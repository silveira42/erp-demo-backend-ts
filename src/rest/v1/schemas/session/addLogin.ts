import { object, string, number, InferType } from 'yup';

export const addLoginSchema = object({
	key: string().required(),
	type: number().required().integer().min(0),
});

export type addLoginType = InferType<typeof addLoginSchema>;
