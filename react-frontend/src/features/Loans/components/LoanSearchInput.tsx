import useSearchLoan from "../hooks/useSearchLoan";

interface LoanSearchInput {
  placeholder?: string;
}
const LoanSearchInput = ({ placeholder }: LoanSearchInput) => {
  const { query, search, handleOnChange } = useSearchLoan();

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") search();
  };

  return (
    <input
      type="number"
      min="1"
      className="form-control"
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      value={query?.toString()}
      placeholder={placeholder}
    />
  );
};

export default LoanSearchInput;
