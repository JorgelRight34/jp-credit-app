import { Transaction } from "./transaction";

export interface TransactionStats {
    lastTransaction?: Transaction;
    nextTransaction?: Transaction
    nextTransactionDate?: string;
}
