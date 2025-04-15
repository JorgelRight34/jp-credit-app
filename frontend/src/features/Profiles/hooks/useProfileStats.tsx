import api from "../../../api";
import { baseUrl } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";

const useProfileStats = (username: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["stats", username],
    queryFn: () => fetchStats(username),
  });

  const fetchStats = async (username: string) => {
    const response = await api.get(`${baseUrl}/${username}/stats`);
    return response.data;
  };

  return { stats: data, isError, isLoading };
};

export default useProfileStats;
