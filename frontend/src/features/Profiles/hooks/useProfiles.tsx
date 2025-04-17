import api from "../../../api";
import { Role } from "../../../models/role";
import { baseUrl } from "../lib/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useProfiles = (role: Role = "user", page = 1) => {
  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["profiles", role],
    queryFn: () => fetchClients(page),
  });

  const fetchClients = async (page: number = 1) => {
    const response = await api.get(`${baseUrl}/role/${role}/?page=${page}`);
    return response.data;
  };

  const fetchPage = async (page: number) => {
    // Fetch data with page to be in cache
    const data = await queryClient.fetchQuery({
      queryKey: ["profiles", role, page],
      queryFn: () => fetchClients(page),
    });

    // Update profiles
    queryClient.setQueryData(["profiles", role], data);

    return data;
  };

  return {
    profiles: data || [],
    isError,
    isLoading,
    fetchPage,
  };
};

export default useProfiles;
