import api from "../../../api";
import { baseUrl } from "../lib/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loan } from "../../../models/loan";

interface UseLoansProps {
  query?: string;
  page?: number;
}

const useLoans = ({ query = "", page = 1 }: UseLoansProps) => {
  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery<Loan[]>({
    queryKey: ["loans", query],
    queryFn: () => fetchLoans(page, query),
  });

  const fetchLoans = async (page: number = 1, query = "") => {
    const response = await api.get(
      `${baseUrl}/?page=${page}&limit=50&${query}`
    );
    return response.data;
  };

  const fetchPage = async (page: number = 1, query = "") => {
    await queryClient.fetchQuery<Loan[]>({
      queryKey: ["loans", query],
      queryFn: () => fetchLoans(page),
      staleTime: 0, // Force refetch
    });
  };

  return { loans: data || [], isError, isLoading, fetchPage };
};

export default useLoans;
