import DataTable from "../../../common/DataTable";
import { Note } from "../../../models/note";
import NoteDataRow from "./NoteDataRow";

interface NotesDataTableProps {
  notes: Note[];
}

const NotesDataTable = ({ notes }: NotesDataTableProps) => {
  const headers = ["Id", "Amount", "Loan Id", "Date"];
  return (
    <DataTable headers={headers}>
      {notes.map((note) => (
        <NoteDataRow key={note.id} note={note} />
      ))}
    </DataTable>
  );
};

export default NotesDataTable;
