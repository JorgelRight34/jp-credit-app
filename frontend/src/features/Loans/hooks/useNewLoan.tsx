import { useDispatch } from "react-redux";
import api from "../../../api";
import { baseUrl, LoanFormValues } from "../lib/constants";
import { addLoan } from "../loansSlice";

const useNewLoan = () => {
  const dispatch = useDispatch();
  const postNewLoan = async (data: LoanFormValues) => {
    const response = await api.post(baseUrl, data);
    dispatch(addLoan(response.data));
  };

  return [postNewLoan];
};

export default useNewLoan;
