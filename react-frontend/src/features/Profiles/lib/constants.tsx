import { z } from "zod";
import { FormField } from "../../../models/formField";

export const schema = z.object({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  maritalStatus: z.string(),
  dni: z.string().min(11).max(11),
  address: z.string(),
  landline: z.string(),
  officePhone: z.string(),
});

export const profileFormDefaultValues: ProfileFormValues = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  dateOfBirth: "",
  maritalStatus: "",
  dni: "",
  address: "",
  landline: "",
  officePhone: "",
};

export type ProfileFormValues = z.infer<typeof schema>;

export const profileFormFields: FormField[] = [
  {
    name: "username",
    label: "Username",
  },
  {
    name: "firstName",
    label: "First Name",
  },
  {
    name: "lastName",
    label: "Last Name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    name: "dni",
    label: "DNI",
  },
  {
    name: "address",
    label: "Address",
  },
  {
    name: "landline",
    label: "Landline",
  },
  {
    name: "officePhone",
    label: "Office Phone",
  },
];
