import api from "../../../api";
import { LoanFormValues } from "../lib/constants";
import { useQueryClient } from "@tanstack/react-query";

type UseEditLoanReturn = [(data: LoanFormValues, id: number) => void];

const useEditLoan = (): UseEditLoanReturn => {
  const queryClient = useQueryClient();

  const editLoan = async (data: LoanFormValues, id: number) => {
    const response = await api.put(`/loans/${id}`, data);
    queryClient.setQueryData(["loans", id], response.data);
  };

  return [editLoan];
};

export default useEditLoan;
