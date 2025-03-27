import useSearchLoan from "../hooks/useSearchLoan";

interface LoanSearchInput {
  fetchData?: boolean;
}

const LoanSearchInput = ({ fetchData = true }: LoanSearchInput) => {
  const { id, search, handleOnChange } = useSearchLoan();

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") search(fetchData);
  };

  return (
    <input
      type="number"
      min="1"
      className="form-control"
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      value={id?.toString()}
      placeholder={"Search by loan id"}
    />
  );
};

export default LoanSearchInput;
