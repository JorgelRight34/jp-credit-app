import api from "../../../api";
import { baseUrl } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../App";
import { Loan } from "../../../models/loan";

const useLoans = (query: string = "", page: number = 1) => {
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
    });
  };

  return { loans: data || [], isError, isLoading, fetchPage };
};

export default useLoans;
