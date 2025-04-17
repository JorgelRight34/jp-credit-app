import api from "../../../api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useTransactions = (query = "", page = 1) => {
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["transactions", query],
    queryFn: () => fetchTransactions(page, query),
  });

  const fetchTransactions = async (page: number = 1, query?: string) => {
    const response = await api.get(`transactions?page=${page}&${query}`);
    return response.data;
  };

  const fetchPage = async (page: number) => {
    const data = await queryClient.fetchQuery({
      queryKey: ["transactions", query],
      queryFn: () => fetchTransactions(page, query),
      staleTime: 0, // Force refetch
    });
    return data;
  };

  return { transactions: data || [], isError, isLoading, fetchPage };
};

export default useTransactions;
