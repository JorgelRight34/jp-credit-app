import { useDispatch } from "react-redux";
import api from "../../../api";
import { addTransaction } from "../transactionsSlice";

const useNewTransaction = () => {
  const dispatch = useDispatch();

  const addNewTransaction = async (data: any) => {
    const response = await api.post("transactions", data);
    dispatch(addTransaction(response.data));
  };

  return [addNewTransaction];
};

export default useNewTransaction;
