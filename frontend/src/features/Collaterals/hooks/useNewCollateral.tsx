import { useDispatch } from "react-redux";
import api from "../../../api";
import { addCollateral } from "../collateralsSlice";
import { CollateralFormValues } from "../lib/constants";

const useNewCollateral = () => {
  const dispatch = useDispatch();

  const addNewCollateral = async (data: CollateralFormValues) => {
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
