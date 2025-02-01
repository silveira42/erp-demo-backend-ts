import { object, string, InferType, number, date, ref } from 'yup';

export const creditCreateSchema = object({
	description: string().required(),
	creditBankId: string().required(),
	purchaseDate: date().required(),
	amount: number().required(),
	totalInstallments: number().required().min(1),
	paidInstallments: number().required().min(0).max(ref('totalInstallments')),
	reservedBy: string().optional().nullable(),
	paidAt: date().optional().nullable(),
	type: number().optional().min(1).max(2).default(1),
});

export type creditCreateType = InferType<typeof creditCreateSchema>;
