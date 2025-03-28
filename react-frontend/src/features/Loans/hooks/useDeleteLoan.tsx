import { useDispatch } from "react-redux";
import api from "../../../api";
import { removeLoan } from "../loansSlice";
import { baseUrl } from "../lib/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useDeleteLoan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteLoan = async (id: number) => {
    if (confirm("Are you sure you want to delete this record?")) {
      const numberId = Number(id);
      if (!isNaN(numberId)) {
        await api.delete(`${baseUrl}/${id}`);
        dispatch(removeLoan({ id: id }));
      } else {
        toast.error("Invalid id for loan");
      }
      navigate("/loans");
    }
  };

  return [deleteLoan];
};

export default useDeleteLoan;
