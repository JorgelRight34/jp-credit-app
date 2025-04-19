import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable/DataTable";
import useLoans from "../../Loans/hooks/useLoans";
import { Loan } from "../../../models/loan";
import LinkToLoan from "../../Loans/components/LinkToLoan";
import LinkToProfile from "../../Profiles/components/LinkToProfile";
import { toCurrency } from "../../../utils/utils";

const IncomesDataTable = () => {
  const { loans, fetchPage } = useLoans({ page: 1 });

  const columns: ColumnDef<Loan>[] = [
    {
      accessorKey: "id",
      header: "Préstamo",
      enableSorting: true,
      cell: ({ row }) => <LinkToLoan loan={row.original} />,
    },
    {
      accessorKey: "client",
      header: "Cliente",
      enableSorting: true,
      cell: ({ row }) => <LinkToProfile profile={row.original.client} />,
    },
    {
      accessorKey: "accruedInterest",
      header: "Interés",
      enableSorting: true,
      cell: ({ row }) => toCurrency(row.original.accruedInterest),
    },
  ];

  return (
    <DataTable data={loans} columns={columns} navigateCallback={fetchPage} />
  );
};

export default IncomesDataTable;
