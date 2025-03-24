import { User } from "./user";

export interface RootState {
  user: User;
  clients: User[];
  loanOfficers: User[];
}
