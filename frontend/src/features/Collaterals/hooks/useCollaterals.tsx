import { useEffect } from "react";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setCollaterals } from "../collateralsSlice";
import { Collateral } from "../../../models/collateral";

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

const useCollaterals = (query: string = ""): UseCollateralsReturn => {
  const { collaterals } = useSelector((state: RootState) => state.collaterals);
  const dispatch = useDispatch();

  const fetchCollaterals = async (page: number = 1) => {
    const response = await api.get(`collaterals?page=${page}&${query}`);
    dispatch(setCollaterals(response.data));
  };

  useEffect(() => {
    fetchCollaterals();
  }, []);

  return [collaterals, fetchCollaterals];
};

export default useCollaterals;
