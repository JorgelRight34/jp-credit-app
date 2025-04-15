import { Photo } from "./photo";
import { Role } from "./role";

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  photoUrl?: string;
  address: string;
  email: string;
  dateOfBirth: string | Date;
  maritalStatus: string;
  dni: string;
  landline: string;
  officePhone: string;
  roles?: Role[];
  photo?: Photo;
  label?: string;
}
