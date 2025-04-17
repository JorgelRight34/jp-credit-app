import { useState } from "react";
import api from "../../../api";
import { baseUrl } from "../lib/constants";
import { useQueryClient } from "@tanstack/react-query";

export interface SearchLoanQuery {
  id: string | number;
  startDate: string;
  endDate: string;
  type: string;
}

const useSearchLoan = () => {
  const [query, setQuery] = useState<SearchLoanQuery>({
    id: 0,
    startDate: "",
    endDate: "",
    type: "active",
  });
  const queryClient = useQueryClient();

  const search = async (fetchData: boolean = true) => {
    if (query.id && query.id !== "0") {
      searchById(Number(query.id));
      return;
    }

    if (!fetchData) return;
    // If item not in memory then fetch it
    const q = Object.keys(query)
      .map((key) => `${key}=${query[key as keyof typeof query]}`)
      .join("&");
    const data = await queryClient.fetchQuery({
      queryKey: ["loans", q],
      queryFn: () => searchByQuery(q),
    });
    return data;
  };

  const searchByQuery = async (query: string) => {
    const response = await api.get(`${baseUrl}/?${query}}`);
    return response.data;
  };

  const searchById = async (id: number) => {
    // Try to find item on memory first
    const data = await queryClient.fetchQuery({
      queryKey: ["loans", id],
      queryFn: () => fetchLoanById(query.id),
    });
    return data;
  };

  const fetchLoanById = async (id: number | string) => {
    const response = await api.get(`${baseUrl}/${id}`);
    return response.data;
  };

  const handleOnChange = (
    target: keyof SearchLoanQuery,
    value: string | number
  ) => {
    setQuery((prev) => ({ ...prev, [target]: value }));
  };

  return { query, search, handleOnChange };
};

export default useSearchLoan;
