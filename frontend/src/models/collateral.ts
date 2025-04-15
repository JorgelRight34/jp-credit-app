import { CollateralCondition } from "./collateralCondition";
import { CollateralStatus } from "./collateralStatus";
import { Loan } from "./loan";
import { Photo } from "./photo";
import { User } from "./user";

export interface Collateral {
  id: number;
  title: string;
  photo: Photo;
  description: string;
  value: number;
  documentUrl: string;
  clientId: string;
  condition: CollateralCondition;
  status: CollateralStatus;
  client: User;
  loanId: number;
  loan: Loan;
}
