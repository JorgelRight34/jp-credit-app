import React, { useState } from "react";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { setCollaterals } from "../collateralsSlice";
import { RootState } from "../../../store";

type UseSearchCollateralReturn = {
  query: number | undefined;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: () => Promise<void>;
};

/**
 * Provides search functionality for collaterals by ID
 * @returns {UseSearchCollateralReturn} Object containing:
 *   - query: Current search query (number or null)
 *   - handleOnChange: Input change handler for search field
 *   - search: Async function to execute the search
 *
 * @example
 * const { query, handleOnChange, search } = useSearchCollateral();
 *
 * // In your component
 * <input
 *   type="text"
 *   value={query || ''}
 *   onChange={handleOnChange}
 *   onBlur={search}
 * />
 */

const useSearchCollateral = (): UseSearchCollateralReturn => {
  const [query, setQuery] = useState<number | undefined>();
  const { collaterals } = useSelector((state: RootState) => state.collaterals);
  const dispatch = useDispatch();

  const search = async () => {
    // Try to find item in memory
    const found = collaterals.find((collateral) => collateral.id === query);
    if (found) {
      dispatch(setCollaterals(found));
      return;
    }

    // If item not in memory fetch it
    const response = await api.get(`collaterals/?title=${query}`);
    dispatch(setCollaterals(response.data));
  };

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (isNaN(Number(value))) return;
    setQuery(value);
  };

  return { query, handleOnChange, search };
};

export default useSearchCollateral;
