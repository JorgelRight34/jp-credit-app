import api from "../../../api"
import { useQueryClient } from "@tanstack/react-query";
import { Transaction } from "../../../models/transaction";

const useDeleteTransaction = () => {
    const queryClient = useQueryClient();

    const deleteTransaction = async (id: number) => {
        if (!id) return;
        const response = await api.delete(`transactions/${id}`);
        const transaction = response.data;

        // Set individual
        queryClient.setQueryData(["transactions", id], transaction);

        // Set plural
        queryClient.setQueryData<Transaction[]>(["transactions", ""], (prev) => prev?.filter(el => el.id !== id))

        return transaction;
    }

    return [deleteTransaction]
}

export default useDeleteTransaction