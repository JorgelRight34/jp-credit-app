import { z } from "zod";
import { FormField } from "../../../models/formField";

export const schema = z.object({
  value: z.string().transform((val) => Number(val)),
  type: z.string(),
  loanId: z.string().transform((val) => Number(val)),
  payerId: z
    .object({ value: z.string(), label: z.string() })
    .transform((val) => val.value),
  date: z.string(),
});

export const transactionFormFields: FormField[] = [
  {
    name: "value",
    label: "Value",
    step: 0.001,
  },
  {
    name: "date",
    label: "Date",
    type: "date",
  },
];
