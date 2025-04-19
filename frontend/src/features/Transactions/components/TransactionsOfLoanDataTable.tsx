import { Transaction } from "../../../models/transaction";
import useTransactions from "../hooks/useTransactions";
import TransactionsDataTable from "./TransactionsDataTable";

interface TransactionsOfLoanDataTableProps {
  transaction: Transaction;
}

const TransactionsOfLoanDataTable = ({
  transaction,
}: TransactionsOfLoanDataTableProps) => {
  const { transactions } = useTransactions(transaction.loanId);

  if (!transactions) return <></>;

  return <TransactionsDataTable transactions={transactions} />;
};

export default TransactionsOfLoanDataTable;
