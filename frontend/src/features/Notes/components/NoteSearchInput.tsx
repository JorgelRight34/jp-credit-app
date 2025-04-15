import SearchBtn from "../../../common/ui/SearchBtn";
import useSearchNote from "../hooks/useSearchNote";

const NoteSearchInput = () => {
  const { searchNote, handleOnLoanIdChange, handleOnNoteIdChange } =
    useSearchNote();

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await searchNote();
  };

  return (
    <form className="row" onSubmit={handleOnSubmit}>
      <div className="col-lg-5">
        <input
          type="search"
          className="form-control"
          placeholder={"Id préstamo"}
          name="loanId"
          onChange={handleOnLoanIdChange}
        />
      </div>
      <div className="col-lg-5">
        <input
          type="search"
          className="form-control"
          placeholder={"Id nota"}
          name="noteId"
          onChange={handleOnNoteIdChange}
        />
      </div>
      <div className="col-lg-2">
        <SearchBtn type="submit" />
      </div>
    </form>
  );
};

export default NoteSearchInput;
