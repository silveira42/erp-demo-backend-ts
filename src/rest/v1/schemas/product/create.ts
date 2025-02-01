import { object, string, InferType, number } from 'yup';

export const productCreateSchema = object({
	title: string().required(),
	price: number().required(),
	description: string().required(),
	thumbnail: string().required(),
	sku: string().optional(),
});

export type productCreateType = InferType<typeof productCreateSchema>;
