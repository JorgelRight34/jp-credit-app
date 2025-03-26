import { useDispatch } from "react-redux";
import api from "../../../api"
import { removeTransaction } from "../transactionsSlice";

const useDeleteTransaction = (id?: string) => {
    const dispatch = useDispatch();

    const deleteTransaction = async () => {
        if (!id) return;
        await api.delete(`transactions/${id}`);
        dispatch(removeTransaction({ id: id }));
    }

    return [deleteTransaction]
}

export default useDeleteTransaction