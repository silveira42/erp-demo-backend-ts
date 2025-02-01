import { object, string, InferType, number } from 'yup';

export const orderCreateSchema = object({
	customer: string().required(),
	deliveryCEP: string().required(),
	productId: string().required(),
	quantity: number().required(),
	total: number().required(),
});

export type orderCreateType = InferType<typeof orderCreateSchema>;
