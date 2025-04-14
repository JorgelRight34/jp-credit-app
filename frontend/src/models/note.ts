import { Loan } from "./loan";

export interface Note {
    id: number;
    description: string;
    amount: number;
    date: Date | string;
    loan: Loan;
    loanId: number;
}