import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable/DataTable";
import { Transaction } from "../../../models/transaction";
import {
  sortDateRows,
  toCurrency,
  toFormattedDate,
} from "../../../utils/utils";
import { useNavigate } from "react-router";
import LinkToProfile from "../../Profiles/components/LinkToProfile";
import LinkToLoan from "../../Loans/components/LinkToLoan";

interface TransactionsDataTableProps {
  transactions: Transaction[];
  navigateCallback?: (page: number) => void;
  extraColumns?: ColumnDef<Transaction>[];
  startInsertingColumnsAt?: number;
}

const columns: ColumnDef<Transaction>[] = [
  { accessorKey: "id", header: "Id", enableSorting: true },
  { accessorKey: "type", header: "Tipo", enableSorting: true },
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
      <LinkToLoan id={row.original.loanId}>{row.original.loanId}</LinkToLoan>
    ),
  },
  {
    accessorKey: "payerId",
    header: "Cliente",
    cell: ({ row }) => (
      <LinkToProfile
        profile={row.original.payer}
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
      />
    ),
  },
  {
    accessorKey: "date",
    header: "Fecha",
    enableSorting: true,
    sortingFn: sortDateRows,
    cell: ({ row }) => toFormattedDate(row.original.date),
  },
];

const TransactionsDataTable = ({
  transactions,
  navigateCallback,
  extraColumns = [],
  startInsertingColumnsAt,
}: TransactionsDataTableProps) => {
  const navigate = useNavigate();

  return (
    <DataTable
      columns={
        startInsertingColumnsAt
          ? columns.splice(startInsertingColumnsAt, 0, ...extraColumns)
          : columns
      }
      data={transactions}
      onRowClick={(transaction: Transaction) => {
        navigate(`/transactions/${transaction.id}`);
      }}
      navigateCallback={navigateCallback}
    />
  );
};

export default TransactionsDataTable;
