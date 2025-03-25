import { useDispatch } from "react-redux";
import api from "../../../api";
import { addCollateral } from "../collateralsSlice";

const useNewCollateral = () => {
  const dispatch = useDispatch();

  const addNewCollateral = async (data: any) => {
    const response = await api.post("collaterals", data);
    dispatch(addCollateral(response.data));
  };

  return [addNewCollateral];
};

export default useNewCollateral;
