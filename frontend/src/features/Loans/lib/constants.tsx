import { z } from "zod";
import { FormField } from "../../../models/formField";
import { LoanStatus } from "../../../models/loanStatus";

export const baseUrl = "loans";

export const schema = z
  .object({
    approvedAmount: z.union([
      z
        .string()
        .transform((val) => Number(val))
        .refine((val) => val > 0, { message: "Must be greater than 0 " }),
      z.number(),
    ]),
    disbursedAmount: z.union([
      z
        .string()
        .transform((val) => Number(val))
        .refine((val) => val > 0, { message: "Must be greater than 0" }),
      z.number(),
    ]),
    annualInterest: z.union([
      z.string().transform((val) => Number(val)),
      z.number(),
    ]),
    numberOfPayments: z.union([
      z
        .string()
        .transform((val) => Number(val))
        .refine((val) => val > 0, { message: "Must be greater than 0" }),
      z.number(),
    ]),
    paymentFrequency: z.union([
      z
        .string()
        .transform((val) => Number(val))
        .refine((val) => val > 0, { message: "Must be greater than 0" }),
      z.number(),
    ]),
    startDate: z.string(),
    deliveryDate: z.string(),
    loanOfficerId: z.union([
      z
        .object({
          value: z.string().min(1),
          label: z.string(),
        })
        .transform((val) => val.value),
      z.string(),
    ]),
    clientId: z.union([
      z
        .object({
          value: z.string().min(1),
          label: z.string(),
        })
        .transform((val) => val.value),
      z.string(),
    ]),
    status: z.string(),
  })
  .refine((data) => new Date(data.deliveryDate) > new Date(data.startDate), {
    message: "La fecha final debe ser mayor a la inicial",
    path: ["deliveryDate"],
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
    label: "Fecha de Entrega",
    type: "date",
  },
];

export const loanFormDefaultValues: LoanFormValues = {
  approvedAmount: 0,
  disbursedAmount: 0,
  annualInterest: 0,
  numberOfPayments: 0,
  paymentFrequency: 0,
  startDate: "",
  deliveryDate: "",
  loanOfficerId: "",
  clientId: "",
  status: LoanStatus.Active,
};
