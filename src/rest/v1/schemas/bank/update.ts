import { object, string, InferType } from 'yup';

export const bankUpdateSchema = object({
	name: string().optional(),
	color: string().optional(),
	icon: string().optional(),
});

export type bankUpdateType = InferType<typeof bankUpdateSchema>;
