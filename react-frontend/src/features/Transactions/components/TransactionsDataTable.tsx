import DataTable from "../../../common/DataTable";
import { Transaction } from "../../../models/transaction";
import TransactionDataRow from "./TransactionDataRow";

interface TransactionsDataTableProps {
  transactions: Transaction[];
  navigateCallback: (page: number) => void;
}

const TransactionsDataTable = ({
  transactions,
}: TransactionsDataTableProps) => {
  const headers = [
    "Id",
    "Capital",
    "Interest",
    "Deliquency",
    "Loan Id",
    "Payer",
  ];

  return (
    <DataTable headers={headers}>
      {transactions.map((transaction) => (
        <TransactionDataRow transaction={transaction} key={transaction.id} />
      ))}
    </DataTable>
  );
};

export default TransactionsDataTable;
