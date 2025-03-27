import { useDispatch } from "react-redux";
import api from "../../../api";
import { CollateralFormValues } from "../lib/constants";
import { updateCollateral } from "../collateralsSlice";

const useEditCollateral = () => {
  const dispatch = useDispatch();

  const editCollateral = async (data: CollateralFormValues, id?: number) => {
    const response = await api.put(`collaterals/${id}`, {
      ...data,
      agreementType: "car",
    });
    dispatch(updateCollateral(response.data));
  };

  return [editCollateral];
};

export default useEditCollateral;
