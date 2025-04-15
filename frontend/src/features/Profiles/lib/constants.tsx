import { z } from "zod";
import { FormField } from "../../../models/formField";
import { User } from "../../../models/user";

export const baseUrl = "users";

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

export const profileFormFields: FormField<User>[] = [
  {
    name: "username",
    label: "Username",
    showOnEdit: false,
  },
  {
    name: "firstName",
    label: "Nombres",
  },
  {
    name: "lastName",
    label: "Apellidos",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "dateOfBirth",
    label: "Nacimiento",
    type: "date",
    required: true,
  },
  {
    name: "dni",
    label: "DNI",
  },
  {
    name: "address",
    label: "Dirección",
  },
  {
    name: "landline",
    label: "Teléfono Fijo",
  },
  {
    name: "officePhone",
    label: "Teléfono Oficina",
  },
  {
    name: "gender",
    label: "Género",
    type: "select",
    options: [
      ["M", "Masculino"],
      ["F", "Femenino"],
    ],
  },
  {
    name: "maritalStatus",
    label: "Estado Civil",
    type: "select",
    options: [
      ["single", "Soltero"],
      ["married", "Casado"],
      ["divorced", "Divorciado"],
      ["widow", "Viud@"],
    ],
  },
  {
    name: "photo",
    label: "Foto",
    type: "file",
  },
];
