import { NavLink, useNavigate } from "react-router";
import { Note } from "../../../models/note";
import { toCurrency, toFormattedDate } from "../../../utils/utils";

interface NoteDataRowProps {
  note: Note;
}

const NoteDataRow = ({ note }: NoteDataRowProps) => {
  const navigate = useNavigate();
  return (
    <tr
      onClick={(event) => {
        event.stopPropagation();
        navigate(`/notes/${note.id}`);
      }}
    >
      <td>{note.id}</td>
      <td>{toCurrency(note.amount)}</td>
      <td>
        <NavLink
          to={`/loans/${note.loanId}`}
          onClick={(event) => event.stopPropagation()}
        >
          {note.loanId}
        </NavLink>
      </td>
      <td>{toFormattedDate(new Date(note.date))}</td>
    </tr>
  );
};

export default NoteDataRow;
