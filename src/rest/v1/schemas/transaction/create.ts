import { object, string, InferType, number, date } from 'yup';

export const transactionCreateSchema = object({
	description: string().required(),
	transactionDate: date().required(),
	amount: number().required(),
	type: number().required().min(0).max(1),
	poolId: string().required(),
});

export type transactionCreateType = InferType<typeof transactionCreateSchema>;
