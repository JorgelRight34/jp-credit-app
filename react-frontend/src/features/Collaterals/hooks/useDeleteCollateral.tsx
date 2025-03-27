import { useDispatch } from "react-redux";
import api from "../../../api";
import { removeCollateral } from "../collateralsSlice";

const useDeleteCollateral = () => {
  const dispatch = useDispatch();

  const deleteCollateral = async (id?: number) => {
    const response = await api.delete(`collaterals/${id}`);
    dispatch(removeCollateral(response.data));
  };

  return [deleteCollateral];
};

export default useDeleteCollateral;
