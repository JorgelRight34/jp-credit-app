import { z } from "zod";
import { FormField } from "../../../models/formField";

export const baseUrl = "loans";

export const schema = z.object({
  approvedAmount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Must be greater than 0 " }),
  disbursedAmount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Must be greater than 0" }),
  annualInterest: z.string().transform((val) => Number(val)),
  numberOfPayments: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Must be greater than 0" }),
  paymentFrequency: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: "Must be greater than 0" }),
  startDate: z.string(),
  deliveryDate: z.string(),
  loanOfficerId: z
    .object({
      value: z.string().min(1),
      label: z.string(),
    })
    .transform((val) => val.value),
  clientId: z
    .object({
      value: z.string().min(1),
      label: z.string(),
    })
    .transform((val) => val.value),
  status: z.string(),
});

export type LoanFormValues = z.infer<typeof schema>;

export const loanFormFields: FormField[] = [
  {
    name: "approvedAmount",
    label: "Approved Amount",
    type: "number",
    step: 0.001,
  },
  {
    name: "disbursedAmount",
    label: "Disbursed Amount",
    type: "number",
    step: 0.001,
  },
  {
    name: "annualInterest",
    label: "Annual Interest Rate (%)",
    type: "number",
    step: 0.001,
  },
  {
    name: "numberOfPayments",
    label: "Number of Payments",
    type: "number",
    step: 0.001,
  },
  {
    name: "paymentFrequency",
    label: "Payment Frequency",
    type: "number",
    step: 0.001,
  },
  {
    name: "startDate",
    label: "Start Date",
    type: "date",
  },
  {
    name: "deliveryDate",
    label: "Delivery Date",
    type: "date",
  },
];
