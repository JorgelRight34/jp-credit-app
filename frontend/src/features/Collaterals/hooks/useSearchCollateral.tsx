import React, { useState } from "react";
import api from "../../../api";
import { useQueryClient } from "@tanstack/react-query";

type UseSearchCollateralReturn = {
  query: string;
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
  const [query, setQuery] = useState<string>("");
  const queryClient = useQueryClient();

  const searchCollateral = async (query: string) => {
    const response = await api.get(`collaterals/?title=${query}`);
    return response.data;
  };

  const search = async () => {
    const data = await queryClient.fetchQuery({
      queryKey: ["collaterals", query],
      queryFn: () => searchCollateral(query),
    });
    queryClient.setQueryData(["collaterals"], data);
  };

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return { query, handleOnChange, search };
};

export default useSearchCollateral;
