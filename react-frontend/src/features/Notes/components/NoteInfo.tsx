import InfoTable from "../../../common/InfoTable";
import { Note } from "../../../models/note";
import { toCurrency, toFormattedDate } from "../../../utils/utils";

interface NoteInfoProps {
  note: Note;
}

const NoteInfo = ({ note }: NoteInfoProps) => {
  return (
    <div className="row mx-0">
      <div className="mb-3">
        <h4>Description</h4>
        <p>
          {note.description
            ? note.description
            : "No description provided for this note."}
        </p>
      </div>
      <div>
        <InfoTable
          data={[
            ["Id", note.id, "Loan Id", note.loanId],
            [
              "Amount",
              toCurrency(note.amount),
              "Date",
              toFormattedDate(new Date(note.date)),
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default NoteInfo;
