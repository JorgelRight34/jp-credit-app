import { useDispatch } from "react-redux";
import api from "../../../api";
import { addCollateral } from "../collateralsSlice";
import { CollateralFormValues } from "../lib/constants";
import { Collateral } from "../../../models/collateral";

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
  const dispatch = useDispatch();

  const addNewCollateral = async (data: CollateralFormValues) => {
    console.log(data);
    const response = await api.post("collaterals", {
      ...data,
      agreementType: "car",
    });
    dispatch(addCollateral(response.data));
    return response.data;
  };

  return [addNewCollateral];
};

export default useNewCollateral;
