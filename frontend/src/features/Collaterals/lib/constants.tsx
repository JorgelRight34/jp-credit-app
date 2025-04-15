import { z } from "zod";
import { FormField } from "../../../models/formField";
import { Collateral } from "../../../models/collateral";
import { getFirstAndLastName } from "../../../utils/utils";
import { ReactNode } from "react";
import { CollateralStatus } from "../../../models/collateralStatus";
import { CollateralCondition } from "../../../models/collateralCondition";

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

export const collateralStatusOptions: [CollateralStatus, string][] = [
  [CollateralStatus.PENDING, "Pendiente"],
  [CollateralStatus.APPROVED, "Aprobado"],
  [CollateralStatus.REJECTED, "Rechazado"],
  [CollateralStatus.UNDER_REVIEW, "En revisión"],
  [CollateralStatus.ACTIVE, "Activo"],
  [CollateralStatus.INACTIVE, "Inactivo"],
];

export const collateralConditionsOptions: [CollateralCondition, string][] = [
  [CollateralCondition.HIGH_QUALITY, "Alta calidad"],
  [CollateralCondition.LOW_QUALITY, "Baja calidad"],
  [CollateralCondition.STABLE, "Estable"],
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
    multiple: true,
  },
];
