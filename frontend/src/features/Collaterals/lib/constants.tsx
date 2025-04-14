import { z } from "zod";
import { FormField } from "../../../models/formField";
import { Collateral } from "../../../models/collateral";
import { getFirstAndLastName } from "../../../utils/utils";
import { ReactNode } from "react";

export const schema = z.object({
  title: z.string(),
  description: z.string(),
  // This union is for when editing, the collateral may initially have value as a number
  value: z.union([z.string().transform((val) => Number(val)), z.number()]),
  condition: z.string(),
  status: z.string(),
  // This union is for when editing, the collateral may initially have documentUrl as null
  documentUrl: z.union([z.string(), z.null()]),
  clientId: z.union([
    z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .transform((val) => val.value),
    z.string(),
  ]),
  loanId: z.union([z.string().transform((val) => Number(val)), z.number()]),
});

export type CollateralFormValues = z.infer<typeof schema>;

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
  ["highQuality", "Alta calidad"],
  ["lowQuality", "Baja calidad"],
  ["stable", "Estable"],
  ["depreciating", "Devaluándose"],
  ["liquid", "Líquido"],
  ["illiquid", "Ilíquido"],
  ["lowRisk", "Bajo riesgo"],
  ["highRisk", "Alto riesgo"],
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

export const collateralsFormFields: FormField<Collateral>[] = [
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
  {
    name: "status",
    label: "Estado",
    type: "select",
    options: collateralStatusOptions,
  },
  {
    name: "condition",
    label: "Condición",
    type: "select",
    options: collateralConditionsOptions,
  },
  {
    name: "clientId",
    label: "Cliente",
    profileDataList: true,
    profileRole: "client",
    showOnEditFn: (collateral: Collateral) =>
      getFirstAndLastName(collateral.client) as ReactNode,
  },
  {
    name: "loanId",
    label: "Préstamo",
    type: "number",
    min: "0",
  },
  {
    name: "photo",
    label: "Foto",
    type: "file",
  },
];
