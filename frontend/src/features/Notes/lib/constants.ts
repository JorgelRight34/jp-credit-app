import { z } from "zod";
import { FormField } from "../../../models/formField";
import { Note } from "../../../models/note";

export const baseUrl = `adjustmentnotes`;

export const schema = z.object({
  amount: z.string().transform((val) => Number(val)),
  description: z.string(),
  loanId: z.union([z.string().transform((val) => Number(val)), z.number()]),
});

export type NoteFormValues = z.infer<typeof schema>;

export const noteFormFields: FormField<Note>[] = [
  {
    name: "amount",
    step: 0.001,
    label: "Monto",
    type: "number",
    required: true,
  },
  {
    name: "description",
    label: "Descripción",
    type: "textarea",
    required: true,
  },
  {
    name: "loanId",
    label: "Préstamo",
    type: "number",
    step: 1,
    required: true,
  },
];
