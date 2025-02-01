import { object, string, InferType, number } from 'yup';

export const creditBankCreateSchema = object({
	name: string().required(),
	reserveBankId: string().required(),
	closureDay: number().required().min(1).max(30),
	daysToPay: number().required(),
	color: string().optional(),
	icon: string().optional(),
});

export type creditBankCreateType = InferType<typeof creditBankCreateSchema>;
