import api from "../../../api";
import { baseUrl, LoanFormValues } from "../lib/constants";

const useNewLoan = () => {
  const postNewLoan = async (data: LoanFormValues) => {
    const response = await api.post(baseUrl, data);
    return response.data;
  };

  return [postNewLoan];
};

export default useNewLoan;
