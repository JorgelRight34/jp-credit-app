import { z } from "zod";
import { FormField } from "../../../models/formField";
import { getFirstAndLastName } from "../../../utils/utils";
import { Loan } from "../../../models/loan";
import { ReactNode } from "react";

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
    description: z.string(),
    annualInterestRate: z.union([
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
    startDate: z.string().default(new Date().toISOString()),
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
    guarantorId: z.union([
      z
        .object({
          value: z.string(),
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

export const loanFormFields: FormField<Loan>[] = [
  {
    name: "approvedAmount",
    label: "Monto Aprobado",
    type: "number",
    min: "0",
    step: 0.001,
  },
  {
    name: "disbursedAmount",
    label: "Desembolsado",
    type: "number",
    min: "0",
    step: 0.001,
  },
  {
    name: "annualInterestRate",
    label: "Tasa Interés Anual",
    type: "number",
    min: "0",
    step: 0.001,
  },
  {
    name: "numberOfPayments",
    label: "Número de Pagos",
    type: "number",
    min: "0",
    step: 0.001,
  },
  {
    name: "paymentFrequency",
    label: "Frecuencia de Pago",
    type: "select",
    options: [
      [12, "Mensual"],
      [1, "Anual"],
      [4, "Trimestral"],
      [2, "Semestral"],
    ],
  },
  {
    name: "startDate",
    label: "Fecha de Inicio",
    type: "date",
    defaultToToday: true,
  },
  {
    name: "deliveryDate",
    label: "Fecha de Entrega",
    type: "date",
  },
  {
    name: "clientId",
    label: "Cliente",
    profileDataList: true,
    profileRole: "user",
    showOnEditFn: (loan: Loan) => getFirstAndLastName(loan.client) as ReactNode,
  },
  {
    name: "loanOfficerId",
    label: "Agente",
    profileDataList: true,
    profileRole: "loanOfficer",
    showOnEditFn: (loan: Loan) =>
      getFirstAndLastName(loan.loanOfficer) as ReactNode,
  },
  {
    name: "guarantorId",
    label: "Garante",
    profileDataList: true,
    profileRole: "guarantor",
    showOnEditFn: (loan: Loan) =>
      getFirstAndLastName(loan.guarantor) as ReactNode,
  },
  {
    name: "status",
    label: "Estado",
    type: "select",
    options: [
      ["active", "Activo"],
      ["inactive", "Inactivo"],
      ["notified", "Notificado"],
      ["punished", "Castigado"],
      ["legal", "legal"],
      ["judicial", "Judicial"],
      ["agreement", "Acuerdo"],
    ],
  },
  {
    name: "description",
    label: "Descripción",
    type: "textarea",
    rows: 2,
    showOnNewRow: true,
  },
];
