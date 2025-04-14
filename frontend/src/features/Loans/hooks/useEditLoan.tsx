import { useDispatch } from "react-redux";
import api from "../../../api";
import { updateLoan } from "../loansSlice";
import { LoanFormValues } from "../lib/constants";

type UseEditLoanReturn = [(data: LoanFormValues, id: number) => void];

const useEditLoan = (): UseEditLoanReturn => {
  const dispatch = useDispatch();

  const editLoan = async (data: LoanFormValues, id: number) => {
    const response = await api.put(`/loans/${id}`, data);
    dispatch(updateLoan(response.data));
  };

  return [editLoan];
};

export default useEditLoan;
