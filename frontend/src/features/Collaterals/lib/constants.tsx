import { z } from "zod";
import { FormField } from "../../../models/formField";

export const schema = z.object({
  title: z.string(),
  description: z.string(),
  // This union is for when editing, the collateral may initially have value as a number
  value: z.union([z.string().transform((val) => Number(val)), z.number()]),
  condition: z.string(),
  status: z.string(),
  // This union is for when editing, the collateral may initially have documentUrl as null
  documentUrl: z.union([z.string(), z.null()]),
  clientId: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .transform((val) => val.value),
  loanId: z.string().transform((val) => Number(val)),
});

export type CollateralFormValues = z.infer<typeof schema>;

export const collateralsFormFields: FormField[] = [
  {
    name: "title",
    label: "Título",
  },
  {
    name: "description",
    label: "Descripción",
  },
  {
    name: "value",
    label: "Costo",
    type: "number",
    step: 0.001,
  },
  {
    name: "documentUrl",
    label: "Documento",
  },
];

export const collateralStatusOptions = [
  ["pending", "Pendiente"],
  ["approved", "Aprobado"],
  ["rejected", "Rechazado"],
  ["under review", "En revisión"],
  ["active", "Activo"],
  ["inactive", "Inactivo"],
  ["seized", "Incautado"],
  ["released", "Liberado"],
  ["defaulted", "Incumplido"],
  ["cleared", "Liquidado"],
  ["expired", "Vencido"],
  ["on hold", "En espera"],
];

export const collateralConditionsOptions = [
  ["high-quality", "Alta calidad"],
  ["low-quality", "Baja calidad"],
  ["stable", "Estable"],
  ["depreciating", "Devaluándose"],
  ["liquid", "Líquido"],
  ["illiquid", "Ilíquido"],
  ["low-risk", "Bajo riesgo"],
  ["high-risk", "Alto riesgo"],
  ["easily recoverable", "Fácil de recuperar"],
  ["difficult to seize", "Difícil de incautar"],
  ["volatile", "Volátil"],
  ["secure", "Seguro"],
  ["undervalued", "Subvalorado"],
  ["overvalued", "Sobrevalorado"],
  ["appreciating", "Apreciándose"],
  ["depreciating rapidly", "Devaluándose rápidamente"],
  ["diversified", "Diversificado"],
  ["concentrated", "Concentrado"],
];
