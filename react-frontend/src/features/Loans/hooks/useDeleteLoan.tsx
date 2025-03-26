import { useDispatch } from "react-redux";
import api from "../../../api";
import { removeLoan } from "../loansSlice";

const useDeleteLoan = (id: string) => {
  const dispatch = useDispatch();

  const deleteLoan = async () => {
    const numberId = Number(id);
    if (isNaN(numberId)) return;
    await api.delete(`loans/${id}`);
    dispatch(removeLoan({ id: numberId }));
  };

  return [deleteLoan];
};

export default useDeleteLoan;
