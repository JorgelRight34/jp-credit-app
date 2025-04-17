import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setCollaterals } from "../collateralsSlice";
import { Collateral } from "../../../models/collateral";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../App";

type UseCollateralsReturn = [Collateral[], (page?: number) => Promise<void>];

/**
 * Fetches and manages a list of collaterals with pagination support
 * @param {string} [query=""] - Query string parameters for filtering
 * @returns {UseCollateralsReturn} Tuple containing:
 *   - collaterals: Array of collateral items
 *   - fetchCollaterals: Function to fetch a specific page (returns Promise)
 *
 * @example
 * const [collaterals, fetchPage] = useCollaterals("type=real-estate");
 *
 * // Fetch next page
 * fetchPage(2).then(() => console.log('Page loaded'));
 */

const useCollaterals = (query: string = "") => {
  const { collaterals } = useSelector((state: RootState) => state.collaterals);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["collaterals", query],
    queryFn: () => fetchCollaterals(query),
  });

  const fetchCollaterals = async (query?: string, page: number = 1) => {
    const response = await api.get(`collaterals?page=${page}&${query}`);
    return response.data;
  };

  const fetchPage = async (page: number, query = "") => {
    const data = await queryClient.fetchQuery({
      queryKey: ["collaterals", query, page],
      queryFn: () => fetchCollaterals(query, page),
    });
    return data;
  };

  return {
    collaterals: data || [],
    isLoading,
    isError,
    error,
    refetch,
    fetchPage,
  };
};

export default useCollaterals;
