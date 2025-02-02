import { object, string, InferType, number } from 'yup';

export const productUpdateSchema = object({
	title: string().optional(),
	price: number().optional(),
	description: string().optional(),
	thumbnail: string().optional(),
	sku: string().optional(),
});

export type productUpdateType = InferType<typeof productUpdateSchema>;
