import { z } from "zod";

export const schema = z.object({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  maritalStatus: z.string(),
  dni: z.string(),
  address: z.string(),
  landline: z.string(),
  officePhone: z.string(),
});

interface ClientFormField {
  name: string;
  label: string;
  type?: string;
  required?: true;
}

export const clientFormFields: ClientFormField[] = [
  {
    name: "username",
    label: "Username",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
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
