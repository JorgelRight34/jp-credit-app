import { User } from "./user";

export interface Client extends User {
  role: "client";
}
