import useSearchCollateral from "../hooks/useSearchCollateral";

const CollateralSearchInput = () => {
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
    />
  );
};

export default CollateralSearchInput;
