import { NavLink, useNavigate } from "react-router";
import DataTable from "../../../common/DataTable";
import { Loan } from "../../../models/loan";
import { getFullName, toCurrency, toFormattedDate } from "../../../utils/utils";
import { ColumnDef } from "@tanstack/react-table";

interface LoansDataTable {
  loans: Loan[];
}

const LoansDataTable = ({ loans }: LoansDataTable) => {
  const columns: ColumnDef<Loan>[] = [
    { accessorKey: "id", header: "Id" },
    {
      header: "Client",
      cell: ({ row }) => {
        const client = row.original.client;
        return client ? (
          <NavLink
            to={`/profiles/${client.username}`}
            onClick={(event) => event.stopPropagation()}
          >
            {getFullName(client)}
          </NavLink>
        ) : (
          "---"
        );
      },
    },
    {
      header: "Approved",
      cell: ({ row }) => toCurrency(row.original.approvedAmount),
    },
    {
      header: "Disbursed",
      cell: ({ row }) => toCurrency(row.original.disbursedAmount),
    },
    {
      header: "Principal",
      cell: ({ row }) => toCurrency(row.original.principalBalance),
    },
    {
      header: "Interests",
      cell: ({ row }) => toCurrency(row.original.accruedInterest),
    },
    {
      header: "Last Payment",
      cell: ({ row }) => {
        const lastPayment = row.original.lastPayment;
        return lastPayment
          ? toFormattedDate(new Date(lastPayment.date))
          : "---";
      },
    },
    {
      header: "Interest Rate",
      cell: ({ row }) => `${row.original.annualInterestRate * 100}%`,
    },
    {
      header: "Date",
      cell: ({ row }) => toFormattedDate(new Date(row.original.createdAt)),
    },
  ];
  const navigate = useNavigate();

  return (
    <DataTable
      columns={columns}
      data={loans}
      onRowClick={(loan: Loan) => navigate(`/loans/${loan.id}`)}
    />
  );
};

export default LoansDataTable;
