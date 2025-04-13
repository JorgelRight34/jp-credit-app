import { useDispatch } from "react-redux";
import api from "../../../api"
import { removeTransaction } from "../transactionsSlice";

const useDeleteTransaction = () => {
    const dispatch = useDispatch();

    const deleteTransaction = async (id: string) => {
        if (!id) return;
        await api.delete(`transactions/${id}`);
        dispatch(removeTransaction({ id: id }));
    }

    return [deleteTransaction]
}

export default useDeleteTransaction