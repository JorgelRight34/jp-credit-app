import api from "../../../api"
import { useQueryClient } from "@tanstack/react-query";
import { Transaction } from "../../../models/transaction";

const useDeleteTransaction = () => {
    const queryClient = useQueryClient();

    const deleteTransaction = async (id: number | string) => {
        if (!id) return;
        const response = await api.delete(`transactions/${id}`);
        const transaction = response.data;

        // Set individual
        queryClient.setQueryData(["transactions", transaction.id], transaction);

        // Set plural
        queryClient.setQueryData<Transaction[]>(["transactions", ""], (prev) => prev?.filter(el => el.id !== transaction.id))
        // Set on type list
        queryClient.setQueryData<Transaction[]>(["transactions", transaction.type], (prev) => prev?.filter(el => el.id !== transaction.id))

        return transaction;
    }

    return [deleteTransaction]
}

export default useDeleteTransaction