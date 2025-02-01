import { object, string, InferType } from 'yup';

export const bankCreateSchema = object({
	name: string().required(),
	color: string().optional(),
	icon: string().optional(),
});

export type bankCreateType = InferType<typeof bankCreateSchema>;
