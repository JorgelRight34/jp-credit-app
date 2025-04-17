import { Loan } from "./loan";
import { Transaction } from "./transaction";

export interface ProfileStats {
  lastLoan: Loan;
  lastTransaction: Transaction;
  loanCount: number;
  collateralCount: number;
}
