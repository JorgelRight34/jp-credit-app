import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable";
import { Transaction } from "../../../models/transaction";
import { toCurrency } from "../../../utils/utils";
import { useNavigate } from "react-router";

interface TransactionsDataTableProps {
  transactions: Transaction[];
  navigateCallback: (page: number) => void;
}

const TransactionsDataTable = ({
  transactions,
}: TransactionsDataTableProps) => {
  const columns: ColumnDef<Transaction>[] = [
    { accessorKey: "id", header: "Id" },
    {
      header: "Capital",
      cell: ({ row }) => toCurrency(row.original.capitalValue),
    },
    {
      header: "Interest",
      cell: ({ row }) => toCurrency(row.original.interestValue),
    },
    {
      header: "Deliquency",
      cell: ({ row }) => toCurrency(row.original.delinquency),
    },
    { accessorKey: "id", header: "Loan Id" },
    { accessorKey: "payerId", header: "Payer" },
  ];
  const navigate = useNavigate();

  return (
    <DataTable
      columns={columns}
      data={transactions}
      onRowClick={(transaction: Transaction) =>
        navigate(`/transactions/${transaction.id}`)
      }
    />
  );
};

export default TransactionsDataTable;
