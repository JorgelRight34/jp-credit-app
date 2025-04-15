import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable/DataTable";
import { Note } from "../../../models/note";
import {
  sortDateRows,
  toCurrency,
  toFormattedDate,
} from "../../../utils/utils";
import { useNavigate } from "react-router";

interface NotesDataTableProps {
  notes: Note[];
  navigateCallback?: (page: number) => void | Promise<void>;
}

const columns: ColumnDef<Note>[] = [
  { accessorKey: "id", header: "Id" },
  {
    accessorKey: "amount",
    header: "Monto",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.amount),
  },
  { accessorKey: "loanId", enableSorting: true, header: "Préstamo" },
  {
    accessorKey: "date",
    header: "Fecha",
    enableSorting: true,
    sortingFn: sortDateRows,
    cell: ({ row }) => toFormattedDate(new Date(row.original.date)),
  },
];

/**
 * LoansDataTablee component displays a table of loans.
 * It uses the DataTable component to render the data in a tabular format.
 *
 * @param {LoansDataTableeProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const NotesDataTable = ({ notes, navigateCallback }: NotesDataTableProps) => {
  const navigate = useNavigate();

  return (
    <DataTable<Note>
      columns={columns}
      data={notes}
      onRowClick={(note: Note) => navigate(`/notes/${note.id}`)}
      navigateCallback={navigateCallback}
    />
  );
};

export default NotesDataTable;
