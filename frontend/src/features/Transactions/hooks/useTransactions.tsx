import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import { RootState } from "../../../store";
import { setTransactions } from "../transactionsSlice";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../App";

const useTransactions = (query = "", page = 1) => {
  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );
  const { isError, isLoading } = useQuery({
    queryKey: ["transactions", query],
    queryFn: () => fetchTransactions(page, query),
  });
  const dispatch = useDispatch();

  const fetchTransactions = async (page: number = 1, query?: string) => {
    const response = await api.get(`transactions?page=${page}&${query}`);
    dispatch(setTransactions(response.data));
    return response.data;
  };

  const fetchPage = async (page: number) => {
    const data = await queryClient.fetchQuery({
      queryKey: ["transactions", query],
      queryFn: () => fetchTransactions(page, query),
    });
    dispatch(setTransactions(data));
    return data;
  };

  return { transactions, isError, isLoading, fetchPage };
};

export default useTransactions;
