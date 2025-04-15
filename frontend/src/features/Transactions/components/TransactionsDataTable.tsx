import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable/DataTable";
import { Transaction } from "../../../models/transaction";
import {
  getFirstAndLastName,
  sortDateRows,
  toCurrency,
  toFormattedDate,
} from "../../../utils/utils";
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
      <NavLink
        to={`/profiles/${row.original.payer.username}`}
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
      >
        {getFirstAndLastName(row.original.payer)}
      </NavLink>
    ),
  },
  {
    accessorKey: "date",
    header: "Fecha",
    enableSorting: true,
    sortingFn: sortDateRows,
    cell: ({ row }) => toFormattedDate(new Date(row.original.date)),
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
      onRowClick={(transaction: Transaction) => {
        navigate(`/transactions/${transaction.id}`);
      }}
      navigateCallback={navigateCallback}
    />
  );
};

export default TransactionsDataTable;
