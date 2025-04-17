import api from "../../../api";
import { useQuery } from "@tanstack/react-query";

const useTransaction = (id: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => fetchTransaction(Number(id)),
  });

  const fetchTransaction = async (id: number) => {
    const response = await api.get(`transactions/${id}`);
    return response.data;
  };

  return { transaction: data, isError, isLoading };
};

export default useTransaction;
