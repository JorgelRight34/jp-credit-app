import { useDispatch } from "react-redux";
import api from "../../../api";
import { addCollateral } from "../collateralsSlice";
import { CollateralFormValues } from "../lib/constants";
import { Collateral } from "../../../models/collateral";
import { useQueryClient } from "@tanstack/react-query";

type UseNewCollateralReturn = [
  (data: CollateralFormValues) => Promise<Collateral>
];

/**
 * Provides a function to create new collateral items
 * @returns {UseNewCollateralReturn} Array containing:
 *   - addNewCollateral: Async function to create new collateral
 *     - @param {CollateralFormValues} data - Form values for the new collateral
 *     - @returns {Promise<Collateral>} The created collateral data
 *
 * @example
 * const [addNewCollateral] = useNewCollateral();
 *
 * // Create new collateral
 * addNewCollateral(formValues)
 *   .then(newCollateral => console.log('Created:', newCollateral))
 *   .catch(error => console.error('Creation failed', error));
 */
const useNewCollateral = (): UseNewCollateralReturn => {
  const queryClient = useQueryClient();

  const addNewCollateral = async (data: CollateralFormValues) => {
    const response = await api.post("collaterals", {
      ...data,
      expirationDate: data.expirationDate || null,
    });
    queryClient.setQueryData<Collateral[]>(["collaterals", ""], (prev) => [
      ...(prev || []),
      response.data,
    ]);
    return response.data;
  };

  return [addNewCollateral];
};

export default useNewCollateral;
