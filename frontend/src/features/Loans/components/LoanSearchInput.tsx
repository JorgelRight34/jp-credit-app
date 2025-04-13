import { toast } from "react-toastify";
import useSearchLoan, { SearchLoanQuery } from "../hooks/useSearchLoan";

interface LoanSearchInput {
  fetchData?: boolean;
}

const LoanSearchInput = ({ fetchData = true }: LoanSearchInput) => {
  const { query, search, handleOnChange } = useSearchLoan();

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") search(fetchData);
  };

  const handleOnDateInputBlur = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "startDate") {
      if (new Date(value) > new Date(query.endDate)) {
        toast.error(
          `The start date must be less than or equal to the end date.`
        );
      }
    }

    if (name === "endDate") {
      if (new Date(value) < new Date(query.startDate)) {
        toast.error(
          `The start date must be less than or equal to the end date.`
        );
      }
    }

    handleOnChange(name as keyof SearchLoanQuery, value);
  };

  return (
    <div className="row mx-0">
      <div className="col">
        <div className="form-floating">
          <input
            id="id"
            name="id"
            type="number"
            min="1"
            className="form-control"
            onChange={(e) => handleOnChange("id", e.target.value)}
            onKeyDown={handleOnKeyDown}
            placeholder={"Search by loan id"}
          />
          <label htmlFor="id">Id</label>
        </div>
      </div>
      <div className="col">
        <div className="form-floating">
          <input
            id="startDate"
            type="date"
            name="startDate"
            className="form-control"
            onBlur={handleOnDateInputBlur}
          />
          <label htmlFor="startDate">Start date</label>
        </div>
      </div>
      <div className="col">
        <div className="form-floating">
          <input
            type="date"
            name="endDate"
            className="form-control"
            onBlur={handleOnDateInputBlur}
          />
          <label htmlFor="endDate">End date</label>
        </div>
      </div>
      <div className="col d-flex align-items-center">
        <button
          className="btn btn-accent px-3 w-100"
          onClick={() => search(fetchData)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default LoanSearchInput;
