import { object, string, InferType, number } from 'yup';

export const poolUpdateSchema = object({
	name: string().optional(),
	type: number().optional().min(1).max(5),
	bankId: string().optional(),
	color: string().optional(),
	icon: string().optional(),
});

export type poolUpdateType = InferType<typeof poolUpdateSchema>;
