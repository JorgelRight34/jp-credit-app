import { TransactionType } from "../../../models/transactionType";
import useTransactions from "../hooks/useTransactions";
import TransactionsDataTable from "./TransactionsDataTable";

interface FeesDataTableProps {
  loanId?: number;
}

const FeesDataTable = ({ loanId }: FeesDataTableProps) => {
  const { transactions, fetchPage } = useTransactions({
    type: TransactionType.PC,
    loanId: loanId,
  });

  return (
    <TransactionsDataTable
      transactions={transactions}
      navigateCallback={fetchPage}
    />
  );
};

export default FeesDataTable;
