import { Loan } from "./loan";
import { TransactionType } from "./transactionType";
import { User } from "./user";

export interface Transaction {
  id: number;
  capitalValue: number;
  interestValue: number;
  penaltyFee: number;
  delinquency: number;
  loanId: number;
  payerId: number;
  date: Date | string;
  payer: User;
  loan: Loan;
  type: TransactionType;
}
