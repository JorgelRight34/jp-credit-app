import { useQuery } from "@tanstack/react-query"
import api from "../../../api"
import { TransactionStats } from "../../../models/transactionStats"

const useTransactionStats = (id: number | string) => {
    const { data, isError, isLoading } = useQuery<TransactionStats>({
        queryKey: ["transactions", "stats", Number(id)],
        queryFn: () => fetchTransactionStats(id)
    })

    const fetchTransactionStats = async (id: number | string) => {
        const response = await api.get(`transactions/${id}/stats`);
        return response.data;
    }

    return { stats: data, isError, isLoading };
}

export default useTransactionStats;