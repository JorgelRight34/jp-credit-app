import api from "../../../api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "../../../models/transaction";
import { TransactionType } from "../../../models/transactionType";

interface UseTransactionsProps {
  loanId?: number;
  query?: string;
  page?: number;
  type?: TransactionType;
}

const useTransactions = ({
  loanId,
  page = 1,
  type,
}: UseTransactionsProps = {}) => {
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery<Transaction[]>({
    queryKey: ["transactions", type],
    queryFn: () => fetchTransactions(page, type),
  });

  const fetchTransactions = async (page: number = 1, type = "") => {
    const queryParams = new URLSearchParams();

    if (type) queryParams.append("type", type);
    if (loanId != null) queryParams.append("loanId", String(loanId));
    queryParams.append("page", page.toString());

    const response = await api.get(`transactions?${queryParams.toString()}`);
    return response.data;
  };

  const fetchPage = async (page: number) => {
    const data = await queryClient.fetchQuery({
      queryKey: ["transactions", type],
      queryFn: () => fetchTransactions(page, type),
      staleTime: 0, // Force refetch
    });
    return data;
  };

  return { transactions: data || [], isError, isLoading, fetchPage };
};

export default useTransactions;
