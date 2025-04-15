import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setLoans } from "../loansSlice";
import { baseUrl } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../App";

const useLoans = (query: string = "", page: number = 1) => {
  const { loans } = useSelector((state: RootState) => state.loans);
  const { isError, isLoading } = useQuery({
    queryKey: ["loans", query],
    queryFn: () => fetchLoans(page, query),
  });
  const dispatch = useDispatch();

  const fetchLoans = async (page: number = 1, query = "") => {
    const response = await api.get(
      `${baseUrl}/?page=${page}&limit=50&${query}`
    );
    dispatch(setLoans(response.data));
    return response.data;
  };

  const fetchPage = async (page: number = 1, query = "") => {
    const data = await queryClient.fetchQuery({
      queryKey: ["loans", query],
      queryFn: () => fetchLoans(page),
    });
    dispatch(setLoans(data));
  };

  return { loans, isError, isLoading, fetchPage };
};

export default useLoans;
