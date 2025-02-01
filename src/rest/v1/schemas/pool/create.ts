import { object, string, InferType, number } from 'yup';

export const poolCreateSchema = object({
	name: string().required(),
	type: number().required().min(1).max(5),
	bankId: string().required(),
	color: string().optional(),
	icon: string().optional(),
});

export type poolCreateType = InferType<typeof poolCreateSchema>;
