import api from "../../../api";
import { Collateral } from "../../../models/collateral";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery<Collateral[]>({
    queryKey: ["collaterals", query],
    queryFn: () => fetchCollaterals(query),
  });

  const fetchCollaterals = async (query?: string, page: number = 1) => {
    const response = await api.get(`collaterals?page=${page}&${query}`);
    return response.data;
  };

  const fetchPage = async (page: number, query = "") => {
    const data = await queryClient.fetchQuery<Collateral[]>({
      queryKey: ["collaterals", query],
      queryFn: () => fetchCollaterals(query, page),
      staleTime: 0, // Force refetch
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
