import api from "../../../api";
import { baseUrl, LoanFormValues } from "../lib/constants";

const useNewLoan = () => {
  const postNewLoan = async (data: LoanFormValues) => {
    await api.post(baseUrl, data);
  };

  return [postNewLoan];
};

export default useNewLoan;
