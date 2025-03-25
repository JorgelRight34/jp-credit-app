import { z } from "zod";
import { FormField } from "../../../models/formField";

export const schema = z.object({
  title: z.string(),
  description: z.string(),
  value: z.string().transform((val) => Number(val)),
  condition: z.string(),
  state: z.string(),
  documentUrl: z.string(),
  clientId: z.string(),
});

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
  {
    name: "clientId",
    label: "Client Id",
  },
];
