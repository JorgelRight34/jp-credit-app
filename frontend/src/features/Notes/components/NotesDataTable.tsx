import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable";
import { Note } from "../../../models/note";
import { toCurrency, toFormattedDate } from "../../../utils/utils";
import { useNavigate } from "react-router";

interface NotesDataTableProps {
  notes: Note[];
  navigateCallback: (page: number) => void;
}

const NotesDataTable = ({ notes }: NotesDataTableProps) => {
  const columns: ColumnDef<Note>[] = [
    { accessorKey: "id", header: "Id" },
    { header: "Amount", cell: ({ row }) => toCurrency(row.original.amount) },
    { accessorKey: "loanId", header: "Loan Id" },
    {
      header: "Date",
      cell: ({ row }) => toFormattedDate(new Date(row.original.date)),
    },
  ];
  const navigate = useNavigate();

  return (
    <DataTable
      columns={columns}
      data={notes}
      onRowClick={(note: Note) => navigate(`/notes/${note.id}`)}
    />
  );
};

export default NotesDataTable;
