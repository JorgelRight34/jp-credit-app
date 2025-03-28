import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import { RootState } from "../../../store";
import { setTransactions } from "../transactionsSlice";
import { useEffect } from "react";
import { Transaction } from "../../../models/transaction";

const useTransactions = (
  query?: string
): [Transaction[], (page: number) => Promise<void>] => {
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );
  const dispatch = useDispatch();

  const fetchTransactions = async (page: number = 1) => {
    const response = await api.get(`transactions?page=${page}&${query}`);
    dispatch(setTransactions(response.data));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return [transactions, fetchTransactions];
};

export default useTransactions;
