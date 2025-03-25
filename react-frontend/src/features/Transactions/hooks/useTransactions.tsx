import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import { RootState } from "../../../store";
import { setTransactions } from "../transactionsSlice";
import { useEffect } from "react";

const useTransactions = (query?: string) => {
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );
  const dispatch = useDispatch();

  const fetchTransactions = async () => {
    const response = await api.get(`transactions?${query}`);
    dispatch(setTransactions(response.data));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return [transactions];
};

export default useTransactions;
