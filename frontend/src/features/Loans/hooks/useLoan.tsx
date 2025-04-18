import api from "../../../api";
import { Loan } from "../../../models/loan";
import { baseUrl } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";

const useLoan = (id: string | number) => {
  const { data, isError, isLoading } = useQuery<Loan | null>({
    queryKey: ["loans", Number(id)],
    queryFn: () => fetchLoan(id),
  });

  const fetchLoan = async (id: string | number) => {
    if (!id) return null;
    const response = await api.get(`${baseUrl}/${id}`);
    return response.data;
  };

  return { loan: data, isError, isLoading };
};

export default useLoan;
