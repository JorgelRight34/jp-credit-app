import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import api from "../../../api";
import { setNotes } from "../notesSlice";
import { useEffect } from "react";
import { baseUrl } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../App";

const useNotes = (query: string = "") => {
  const { notes } = useSelector((state: RootState) => state.notes);
  const { isError, isLoading } = useQuery({
    queryKey: ["notes", query],
    queryFn: () => fetchNotes(query),
  });
  const dispatch = useDispatch();

  const fetchNotes = async (query = "", page = 1) => {
    const response = await api.get(baseUrl + `?page=${page}&${query}`);
    dispatch(setNotes(response.data || []));
    return response.data;
  };

  const fetchPage = async (page: number) => {
    const data = await queryClient.fetchQuery({
      queryKey: ["notes", query],
      queryFn: () => fetchNotes(query, page),
    });
    dispatch(setNotes(data));
    return data;
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes, isError, isLoading, fetchPage };
};

export default useNotes;
