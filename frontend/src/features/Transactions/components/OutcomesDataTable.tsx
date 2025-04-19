import { TransactionType } from "../../../models/transactionType";
import useTransactions from "../hooks/useTransactions";
import TransactionsDataTable from "./TransactionsDataTable";

interface OutcomesDataTableProps {
  loanId?: number;
}

const OutcomesDataTable = ({ loanId }: OutcomesDataTableProps) => {
  const { transactions, fetchPage } = useTransactions({
    type: TransactionType.DS,
    loanId: loanId,
  });

  return (
    <TransactionsDataTable
      transactions={transactions}
      navigateCallback={fetchPage}
    />
  );
};

export default OutcomesDataTable;
