import api from "../../../api";
import { Collateral } from "../../../models/collateral";
import { useQuery } from "@tanstack/react-query";

interface UseCollateralReturn {
  collateral: Collateral | null;
  isError: boolean;
  fetchCollateral: (id: string) => Promise<Collateral>;
}

/**
 * Fetches collateral data by ID, first checking in-memory cache
 * @returns {Object} Contains collateral data and error state
 * @property {Collateral|null} collateral - The fetched collateral data
 * @property {boolean} error - True if fetch failed
 */
const useCollateral = (id: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["collateral", id],
    queryFn: () => fetchCollateral(id),
  });

  const fetchCollateral = async (id: string) => {
    const response = await api.get(`collaterals/${id}`);
    return response.data;
  };

  return { collateral: data, isError, isLoading, fetchCollateral };
};

export default useCollateral;
