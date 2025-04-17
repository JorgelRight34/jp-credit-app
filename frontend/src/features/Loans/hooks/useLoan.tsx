import api from "../../../api";
import { baseUrl } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";

const useLoan = (id: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["loans", id],
    queryFn: () => fetchLoan(id),
  });

  const fetchLoan = async (id: string) => {
    const response = await api.get(`${baseUrl}/${id}`);
    return response.data;
  };

  return { loan: data, isError, isLoading };
};

export default useLoan;
