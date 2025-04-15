import { z } from "zod";
import { FormField } from "../../../models/formField";
import { Transaction } from "../../../models/transaction";
import { getFirstAndLastName } from "../../../utils/utils";
import { ReactNode } from "react";
import { TransactionType } from "../../../models/transactionType";

export const schema = z.object({
  value: z.string().transform((val) => Number(val)),
  type: z.string(),
  loanId: z.string().transform((val) => Number(val)),
  payerId: z
    .object({ value: z.string(), label: z.string() })
    .transform((val) => val.value),
  date: z.string().default(new Date().toISOString()),
});

const transactionTypesOptions: [TransactionType, string][] = [
  [TransactionType.DS, "DS | Desembolso"],
  [TransactionType.PC, "PC | Pago Cuota"],
  [TransactionType.NC, "NC | Nota de Crédito"],
  [TransactionType.ND, "ND | Nota de Débito"],
];

export const transactionFormFields: FormField<Transaction>[] = [
  {
    name: "value",
    label: "Monto",
    step: 0.001,
  },
  {
    name: "date",
    label: "Fecha",
    defaultToToday: true,
    type: "date",
  },
  {
    name: "payerId",
    label: "Cliente",
    profileDataList: true,
    profileRole: "client",
    showOnEditFn: (transaction: Transaction) =>
      getFirstAndLastName(transaction.payer) as ReactNode,
  },
  {
    name: "loanId",
    label: "Préstamo",
    type: "number",
    min: "1",
  },
  {
    name: "type",
    label: "Tipo",
    type: "select",
    options: transactionTypesOptions,
  },
];
