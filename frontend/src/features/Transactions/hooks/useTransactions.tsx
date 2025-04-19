import api from "../../../api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "../../../models/transaction";

const useTransactions = (loanId?: number, page = 1, query = "") => {
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery<Transaction[]>({
    queryKey: ["transactions", query],
    queryFn: () => fetchTransactions(page),
  });

  const fetchTransactions = async (page: number = 1) => {
    const response = await api.get(
      `transactions?page=${page}&${loanId != null ? `loanId=${loanId}` : ""}`
    );
    return response.data;
  };

  const fetchPage = async (page: number) => {
    const data = await queryClient.fetchQuery({
      queryKey: ["transactions", query],
      queryFn: () => fetchTransactions(page),
      staleTime: 0, // Force refetch
    });
    return data;
  };

  return { transactions: data || [], isError, isLoading, fetchPage };
};

export default useTransactions;
