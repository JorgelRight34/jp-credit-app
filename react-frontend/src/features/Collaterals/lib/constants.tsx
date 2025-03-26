import { z } from "zod";
import { FormField } from "../../../models/formField";

export const schema = z.object({
  title: z.string(),
  description: z.string(),
  // This union is for when editing, the collateral may initially have value as a number
  value: z.union([z.string().transform((val) => Number(val)), z.number()]),
  condition: z.string(),
  state: z.string(),
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

export const collateralFormDefaultValues: CollateralFormValues = {
  title: "",
  description: "",
  value: 0,
  condition: "",
  state: "",
  documentUrl: "",
  clientId: "",
  loanId: 0,
};

export const collateralsFormFields: FormField[] = [
  {
    name: "title",
    label: "Title",
  },
  {
    name: "description",
    label: "Description",
  },
  {
    name: "value",
    label: "Value",
    type: "number",
    step: 0.001,
  },
  {
    name: "documentUrl",
    label: "Document URL",
  },
];
