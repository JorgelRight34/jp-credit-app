import useSearchCollateral from "../hooks/useSearchCollateral";

interface CollateralSearchInput {
  placeholder: string;
}

const CollateralSearchInput = ({ placeholder }: CollateralSearchInput) => {
  const { query, search, handleOnChange } = useSearchCollateral();

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") search();
  };

  return (
    <input
      className="form-control"
      type="search"
      value={query}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      placeholder={placeholder}
    />
  );
};

export default CollateralSearchInput;
