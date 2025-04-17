import api from "../../../api";
import { useEffect } from "react";
import { baseUrl } from "../lib/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useNotes = (query: string = "") => {
  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes", query],
    queryFn: () => fetchNotes(query),
  });

  const fetchNotes = async (query = "", page = 1) => {
    const response = await api.get(baseUrl + `?page=${page}&${query}`);
    return response.data;
  };

  const fetchPage = async (page: number) => {
    const data = await queryClient.fetchQuery({
      queryKey: ["notes", query],
      queryFn: () => fetchNotes(query, page),
      staleTime: 0, // Force refetch
    });
    return data;
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes: data || [], isError, isLoading, fetchPage };
};

export default useNotes;
