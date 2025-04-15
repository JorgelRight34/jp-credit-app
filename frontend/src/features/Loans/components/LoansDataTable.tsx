import { NavLink, useNavigate } from "react-router";
import DataTable from "../../../common/DataTable/DataTable";
import { Loan } from "../../../models/loan";
import {
  getFirstAndLastName,
  sortDateRows,
  toCurrency,
  toFormattedDate,
} from "../../../utils/utils";
import { ColumnDef } from "@tanstack/react-table";

interface LoansDataTable {
  loans: Loan[];
  navigateCallback: (page: number) => void | Promise<void>;
}

const columns: ColumnDef<Loan>[] = [
  { accessorKey: "id", header: "Id" },
  {
    header: "Cliente",
    accessorKey: "client.username",
    enableSorting: true,
    cell: ({ row }) => {
      const client = row.original.client;
      return client ? (
        <NavLink
          to={`/profiles/${client.username}`}
          onClick={(event: React.MouseEvent) => event.stopPropagation()}
        >
          {getFirstAndLastName(client)}
        </NavLink>
      ) : (
        "---"
      );
    },
  },
  {
    accessorKey: "approvedAmount",
    header: "Aprobado",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.approvedAmount),
  },
  {
    accessorKey: "disbursedAmount",
    header: "Desembolsado",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.disbursedAmount),
  },
  {
    accessorKey: "principalBalance",
    header: "Balance",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.principalBalance),
  },
  {
    accessorKey: "accruedInterest",
    header: "Intereses",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.accruedInterest),
  },
  {
    accessorKey: "lastPayment",
    header: "Último Pago",
    enableSorting: true,
    sortingFn: sortDateRows,
    cell: ({ row }) => {
      const lastPayment = row.original.lastPayment;
      return lastPayment ? toFormattedDate(new Date(lastPayment.date)) : "---";
    },
  },
  {
    accessorKey: "annualInterestRate",
    header: "Intereses",
    enableSorting: true,
    cell: ({ row }) => `${row.original.annualInterestRate * 100}%`,
  },
  {
    accessorKey: "createdAt",
    header: "Fecha Inicio",
    enableSorting: true,
    cell: ({ row }) => toFormattedDate(new Date(row.original.createdAt)),
  },
];

/**
 * LoansDataTable component displays a table of armotization payments.
 * It uses the DataTable component to render the data in a tabular format.
 *
 * @param {LoansDataTableProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const LoansDataTable = ({ loans, navigateCallback }: LoansDataTable) => {
  const navigate = useNavigate();

  return (
    <DataTable
      columns={columns}
      data={loans}
      onRowClick={(loan: Loan) => navigate(`/loans/${loan.id}`)}
      navigateCallback={navigateCallback}
    />
  );
};

export default LoansDataTable;
