import { object, InferType, number, date } from 'yup';

export const periodCreateSchema = object({
	initialAmount: number().required(),
	closesAt: date().optional(),
});

export type periodCreateType = InferType<typeof periodCreateSchema>;
