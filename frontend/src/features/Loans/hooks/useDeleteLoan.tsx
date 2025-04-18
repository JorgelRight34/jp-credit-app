import api from "../../../api";
import { baseUrl } from "../lib/constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Loan } from "../../../models/loan";

const useDeleteLoan = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteLoan = async (id: number) => {
    if (confirm("Are you sure you want to delete this record?")) {
      const numberId = Number(id);
      if (!isNaN(numberId)) {
        await api.delete(`${baseUrl}/${id}`);
        queryClient.setQueryData(["loans", id], undefined);
        queryClient.setQueryData<Loan[]>(["loans", ""], (prev) =>
          prev?.filter((el) => el.id !== id)
        );
      } else {
        toast.error("Invalid id for loan");
      }
      navigate("/loans");
    }
  };

  return [deleteLoan];
};

export default useDeleteLoan;
