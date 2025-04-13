import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable";
import { Transaction } from "../../../models/transaction";
import { getFirstAndLastName, toCurrency } from "../../../utils/utils";
import { NavLink, useNavigate } from "react-router";

interface TransactionsDataTableProps {
  transactions: Transaction[];
  navigateCallback?: (page: number) => void;
}

const columns: ColumnDef<Transaction>[] = [
  { accessorKey: "id", header: "Id", enableSorting: true },
  {
    accessorKey: "capitalValue",
    header: "Capital",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.capitalValue),
  },
  {
    accessorKey: "interestValue",
    header: "Intereses",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.interestValue),
  },
  {
    accessorKey: "delinquency",
    header: "Mora",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.delinquency),
  },
  {
    accessorKey: "loanId",
    header: "Préstamo",
    cell: ({ row }) => (
      <NavLink to={`/loans/${row.original.loanId}`}>
        {row.original.loanId}
      </NavLink>
    ),
  },
  {
    accessorKey: "payerId",
    header: "Cliente",
    cell: ({ row }) => (
      <NavLink to={`/profiles/${row.original.payerId}`}>
        {getFirstAndLastName(row.original.payer)}
      </NavLink>
    ),
  },
];

const TransactionsDataTable = ({
  transactions,
  navigateCallback,
}: TransactionsDataTableProps) => {
  const navigate = useNavigate();

  return (
    <DataTable
      columns={columns}
      data={transactions}
      onRowClick={(transaction: Transaction) =>
        navigate(`/transactions/${transaction.id}`)
      }
      navigateCallback={navigateCallback}
    />
  );
};

export default TransactionsDataTable;
