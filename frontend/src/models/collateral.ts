import { ApiFile } from "./apiFile";
import { CollateralAgreementType } from "./collateralAgreementType";
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
  ownerId: string;
  condition: CollateralCondition;
  createdAt: string;
  status: CollateralStatus;
  owner: User;
  loanId: number;
  loan: Loan;
  photos: Photo[];
  agreementType: CollateralAgreementType;
  location?: string;
  expirationDate?: string;
  files: ApiFile[];
}
