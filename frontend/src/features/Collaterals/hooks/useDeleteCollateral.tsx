import { useDispatch } from "react-redux";
import api from "../../../api";
import { removeCollateral } from "../collateralsSlice";

type UseDeleteCollateralReturn = [(id?: number) => Promise<void>];

/**
 * Provides a function to delete collateral items
 * @returns {UseDeleteCollateralReturn} Array containing:
 *   - deleteCollateral: Async function to delete collateral by ID
 *
 * @example
 * const [deleteCollateral] = useDeleteCollateral();
 *
 * // Delete collateral with ID 123
 * deleteCollateral(123)
 *   .then(() => console.log('Deleted successfully'))
 *   .catch(error => console.error('Deletion failed', error));
 */
const useDeleteCollateral = (): UseDeleteCollateralReturn => {
  const dispatch = useDispatch();

  const deleteCollateral = async (id?: number) => {
    const response = await api.delete(`collaterals/${id}`);
    dispatch(removeCollateral(response.data));
  };

  return [deleteCollateral];
};

export default useDeleteCollateral;
