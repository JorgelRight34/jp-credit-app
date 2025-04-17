import { User } from "./user";

export interface LoanMembers {
    client: User;
    guarantor: User;
    loanOfficer: User;
}