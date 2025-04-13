import useSearchNote from "../hooks/useSearchNote";

const NoteSearchInput = () => {
  const [onSubmit, handleLoanIdChange, handleNoteIdChange] = useSearchNote();

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit();
  };

  return (
    <form className="row" onSubmit={handleOnSubmit}>
      <div className="col-lg-5">
        <input
          type="search"
          className="form-control"
          placeholder={"Search by loan id"}
          name="loanId"
          onChange={handleLoanIdChange}
        />
      </div>
      <div className="col-lg-5">
        <input
          type="search"
          className="form-control"
          placeholder={"Search by note id"}
          name="noteId"
          onChange={handleNoteIdChange}
        />
      </div>
      <div className="col-lg-2">
        <button type="submit" className="btn btn-accent w-100">
          Submit
        </button>
      </div>
    </form>
  );
};

export default NoteSearchInput;
