import { z } from "zod";
import { TransactionType } from "../../../models/transactionType";

export const schema = z.object({
  value: z.string().transform((val) => Number(val)),
  type: z.string(),
  loanId: z.string().transform((val) => Number(val)),
  payerId: z.union([z
    .object({ value: z.string(), label: z.string() })
    .transform((val) => val.value), z.string()]),
  date: z.string().default(new Date().toISOString()),
});

export type TransactionFormValues = z.infer<typeof schema>;

export const transactionTypesOptions: [TransactionType, string][] = [
  [TransactionType.DS, "DS | Desembolso"],
  [TransactionType.PC, "PC | Pago Cuota"],
  [TransactionType.NC, "NC | Nota de Crédito"],
  [TransactionType.ND, "ND | Nota de Débito"],
];
