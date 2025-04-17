import { useDispatch } from "react-redux";
import api from "../../../api";
import { CollateralFormValues } from "../lib/constants";
import { updateCollateral } from "../collateralsSlice";

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
  const dispatch = useDispatch();

  const editCollateral = async (data: CollateralFormValues, id?: number) => {
    console.log(data);
    const response = await api.put(`collaterals/${id}`, {
      ...data,
      agreementType: "car",
    });
    dispatch(updateCollateral(response.data));
    return response.data;
  };

  return [editCollateral];
};

export default useEditCollateral;
