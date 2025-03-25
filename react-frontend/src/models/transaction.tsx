import { User } from "./user";

export interface Transaction {
  id: number;
  capitalValue: number;
  interestValue: number;
  delinquency: number;
  loanId: number;
  payerId: number;
  date: Date | string;
  payer: User;
}
