import { User } from "./user";

export interface Admin extends User {
  role: "admin";
}
