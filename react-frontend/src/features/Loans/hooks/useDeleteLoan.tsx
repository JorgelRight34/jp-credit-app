import { useDispatch } from "react-redux";
import api from "../../../api";
import { removeLoan } from "../loansSlice";
import { baseUrl } from "../lib/constants";

const useDeleteLoan = () => {
  const dispatch = useDispatch();

  const deleteLoan = async (id: number) => {
    await api.delete(`${baseUrl}/${id}`);
    dispatch(removeLoan({ id: id }));
  };

  return [deleteLoan];
};

export default useDeleteLoan;
