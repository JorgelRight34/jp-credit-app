import { useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import { CollateralFormValues } from "../lib/constants";
import { Collateral } from "../../../models/collateral";

type UseEditCollateralReturn = [
  (data: CollateralFormValues, id?: number) => Promise<void>
];

/**
 * Provides a function to edit collateral items
 * @returns {UseEditCollateralReturn} Array containing:
 *   - editCollateral: Async function to update collateral
 *     - @param {CollateralFormValues} data - Form values for the collateral
 *     - @param {number} [id] - ID of the collateral to update
 *
 * @example
 * const [editCollateral] = useEditCollateral();
 *
 * // Edit collateral with ID 123
 * editCollateral(formValues, 123)
 *   .then(() => console.log('Updated successfully'))
 *   .catch(error => console.error('Update failed', error));
 */
const useEditCollateral = (): UseEditCollateralReturn => {
  const queryClient = useQueryClient();

  const editCollateral = async (data: CollateralFormValues, id?: number) => {
    const response = await api.put(`collaterals/${id}`, {
      ...data,
    });
    const collateral = response.data;

    // Set individual
    queryClient.setQueryData(["collaterals", id], collateral);

    // Set plural
    queryClient.setQueryData<Collateral[]>(["collaterals"], (prev) =>
      prev?.map((el) => (el.id === id ? collateral : el))
    );

    return collateral;
  };

  return [editCollateral];
};

export default useEditCollateral;
