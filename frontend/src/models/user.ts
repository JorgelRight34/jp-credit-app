import { ApiFile } from "./apiFile";
import { MaritalStatus } from "./maritalStatus";
import { Role } from "./role";

export interface User {
  id: string;
  age: number;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  photoUrl?: string;
  address: string;
  email: string;
  dateOfBirth: string | Date;
  maritalStatus: MaritalStatus;
  dni: string;
  landline: string;
  officePhone: string;
  roles?: Role[];
  photo?: ApiFile;
  label?: string;
}
