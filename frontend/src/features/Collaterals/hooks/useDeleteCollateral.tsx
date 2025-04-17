import api from "../../../api";
import { useQueryClient } from "@tanstack/react-query";
import { Collateral } from "../../../models/collateral";

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
  const queryClient = useQueryClient();

  const deleteCollateral = async (id?: number) => {
    await api.delete(`collaterals/${id}`);

    // Delete individual
    queryClient.setQueryData(["collaterals", id], undefined);

    // Delete in list
    queryClient.setQueryData<Collateral[]>(["collaterals"], (prev) =>
      prev?.filter((el) => el.id !== id)
    );
  };

  return [deleteCollateral];
};

export default useDeleteCollateral;
