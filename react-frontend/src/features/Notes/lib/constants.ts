import { z } from "zod";
import { FormField } from "../../../models/formField";

export const baseUrl = `adjustmentnotes`;

export const schema = z.object({
    amount: z.string().transform(val => Number(val)),
    description: z.string(),
    loanId: z.string().transform(val => Number(val))
});

export type NoteFormValues = z.infer<typeof schema>;

export const noteFormFields: FormField[] = [
    {
        name: "amount",
        step: 0.001,
        label: "Amount",
        type: "number",
        required: true
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true
    }
]