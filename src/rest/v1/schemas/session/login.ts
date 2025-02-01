import { object, string, number, InferType } from 'yup';

export const loginSchema = object({
	key: string().optional(),
	type: number().required().integer().min(0),
	credential: string().required(),
});

export type loginType = InferType<typeof loginSchema>;
