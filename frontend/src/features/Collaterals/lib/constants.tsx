import { z } from "zod";
import { FormField } from "../../../models/formField";
import { Collateral } from "../../../models/collateral";
import { getFirstAndLastName, toTitleCase } from "../../../utils/utils";
import { ReactNode } from "react";
import {
  collateralAgreementTypeSpanishTranslations,
  collateralConditionSpanishTranslations,
  collateralStatusSpanishTranslations,
} from "../../../utils/constants";

export const schema = z.object({
  title: z.string(),
  description: z.string(),
  // This union is for when editing, the collateral may initially have value as a number
  value: z.union([z.string().transform((val) => Number(val)), z.number()]),
  condition: z.string(),
  status: z.string(),
  // This union is for when editing, the collateral may initially have documentUrl as null
  documentUrl: z.union([z.string(), z.null()]),
  agreementType: z.string(),
  location: z.string(),
  expirationDate: z.string().nullable().default(null),
  ownerId: z.union([
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

const generateOptions = (record: Record<string, string>) =>
  Object.keys(record).map((key) => [
    key,
    toTitleCase(record[String(key) as keyof typeof record]) || "",
  ]);

export const collateralStatusOptions = generateOptions(
  collateralStatusSpanishTranslations
);

export const collateralConditionsOptions = generateOptions(
  collateralConditionSpanishTranslations
);

export const collateralAgreementTypeOptions = generateOptions(
  collateralAgreementTypeSpanishTranslations
);

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
    required: false,
  },
  {
    name: "status",
    label: "Estado",
    type: "select",
    options: collateralStatusOptions,
  },
  {
    name: "agreementType",
    label: "Tipo de Acuerdo",
    type: "select",
    options: collateralAgreementTypeOptions,
  },
  {
    name: "condition",
    label: "Condición",
    type: "select",
    options: collateralConditionsOptions.map((option) => [
      option[0].toLowerCase(),
      option[1],
    ]),
  },
  {
    name: "location",
    label: "Locación",
    required: false,
  },
  {
    name: "expirationDate",
    label: "Expiración",
    type: "date",
    required: false,
    defaultValue: null,
  },
  {
    name: "ownerId",
    label: "Cliente",
    profileDataList: true,
    profileRole: "client",
    showOnEditFn: (collateral: Collateral) =>
      getFirstAndLastName(collateral.owner) as ReactNode,
    watch: "loanId",
    disabledWhen: (value) =>
      value === "" || value === 0 || value == undefined || value === null,
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
