import { useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import { baseUrl, LoanFormValues } from "../lib/constants";
import { Loan } from "../../../models/loan";

const useNewLoan = () => {
  const queryClient = useQueryClient();

  const postNewLoan = async (data: LoanFormValues) => {
    const response = await api.post(baseUrl, {
      ...data,
      annualInterestRate: data.annualInterestRate / 100,
    });
    const loan = response.data;

    // Update list
    queryClient.setQueryData<Loan[]>(["loans", ""], (prev) => [
      ...(prev || []),
      loan,
    ]);

    // Set singular
    queryClient.setQueryData(["loans", loan.id], loan);

    return response.data;
  };

  return [postNewLoan];
};

export default useNewLoan;
