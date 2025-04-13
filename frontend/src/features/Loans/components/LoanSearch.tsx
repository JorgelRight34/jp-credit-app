import { toast } from "react-toastify";
import useSearchLoan, { SearchLoanQuery } from "../hooks/useSearchLoan";
import LoanSearchInput from "./LoanSearchInput";
import SearchBtn from "../../../common/SearchBtn";

interface LoanSearchProps {
  fetchData?: boolean;
}

/**
 * LoanSearch component allows users to filter loans based on their ID and date range.
 *
 * This component includes three input fields: loan ID, start date, and end date.
 * It handles input changes, performs basic date validation, and triggers a search when the "Enter" key is pressed
 * or the search button is clicked.
 *
 * @param {Object} props - Component props.
 * @param {boolean} [props.fetchData=true] - Determines whether the search function should fetch data when executed.
 *
 * @returns {JSX.Element} The rendered loan search form.
 *
 * @example
 * <LoanSearch fetchData={true} />
 */
const LoanSearch = ({ fetchData = true }: LoanSearchProps) => {
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
        <LoanSearchInput
          id="id"
          label="Id"
          type="number"
          min="1"
          onChange={(e) => handleOnChange("id", e.target.value)}
          onKeyDown={handleOnKeyDown}
          placeholder="Id"
        />
      </div>
      <div className="col">
        <LoanSearchInput
          label="Fecha Inicio"
          id="startDate"
          type="date"
          name="startDate"
          onBlur={handleOnDateInputBlur}
        />
      </div>
      <div className="col">
        <LoanSearchInput
          label="Fecha Fin"
          id="endDate"
          type="date"
          name="endDate"
          onBlur={handleOnDateInputBlur}
        />
      </div>
      <div className="col d-flex align-items-end">
        <SearchBtn onClick={() => search(fetchData)}></SearchBtn>
      </div>
    </div>
  );
};

export default LoanSearch;
