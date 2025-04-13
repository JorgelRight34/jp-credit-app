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
    label: "Monto Aprobado",
    type: "number",
    step: 0.001,
  },
  {
    name: "disbursedAmount",
    label: "Desembolsado",
    type: "number",
    step: 0.001,
  },
  {
    name: "annualInterest",
    label: "Tasa Interés Anual",
    type: "number",
    step: 0.001,
  },
  {
    name: "numberOfPayments",
    label: "Número de Pagos",
    type: "number",
    step: 0.001,
  },
  {
    name: "paymentFrequency",
    label: "Frecuencia de Pago",
    type: "number",
    step: 0.001,
  },
  {
    name: "startDate",
    label: "Fecha de Inicio",
    type: "date",
  },
  {
    name: "deliveryDate",
    label: "Fecha Final",
    type: "date",
  },
];
