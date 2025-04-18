import api from "../../../api";
import { useQuery } from "@tanstack/react-query";
import { Transaction } from "../../../models/transaction";

const useTransaction = (id: string | number) => {
  const { data, isError, isLoading } = useQuery<Transaction>({
    queryKey: ["transaction", Number(id)],
    queryFn: () => fetchTransaction(Number(id)),
  });

  const fetchTransaction = async (id: number) => {
    const response = await api.get(`transactions/${id}`);
    return response.data;
  };

  return { transaction: data, isError, isLoading };
};

export default useTransaction;
