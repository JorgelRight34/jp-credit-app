import { useDispatch } from "react-redux";
import api from "../../../api";
import { removeCollateral } from "../collateralsSlice";

const useDeleteCollateral = (id?: number) => {
  const dispatch = useDispatch();

  if (!id) return [];

  const deleteCollateral = async () => {
    const response = await api.delete(`collaterals/${id}`);
    dispatch(removeCollateral(response.data));
  };

  return [deleteCollateral];
};

export default useDeleteCollateral;
