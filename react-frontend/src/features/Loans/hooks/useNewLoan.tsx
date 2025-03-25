import api from "../../../api";

const useNewLoan = () => {
  const postNewLoan = async (data: any) => {
    await api.post("loans", data);
  };

  return [postNewLoan];
};

export default useNewLoan;
