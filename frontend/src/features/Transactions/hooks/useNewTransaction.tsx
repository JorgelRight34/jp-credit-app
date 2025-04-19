import { useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import { TransactionFormValues } from "../lib/utils";
import { Transaction } from "../../../models/transaction";

const useNewTransaction = () => {
  const queryClient = useQueryClient();

  const addNewTransaction = async (data: TransactionFormValues) => {
    const response = await api.post("transactions", data);
    const transaction = response.data;

    // Set individual
    queryClient.setQueryData(["transactions", transaction.id], transaction);

    // Set plural
    queryClient.setQueryData<Transaction[]>(["transactions", ""], (prev) => [
      ...(prev || []),
      transaction,
    ]);
    // Update on type list
    queryClient.setQueryData<Transaction[]>(
      ["transactions", transaction.type],
      (prev) => [...(prev || []), transaction]
    );

    return transaction;
  };

  return [addNewTransaction];
};

export default useNewTransaction;
