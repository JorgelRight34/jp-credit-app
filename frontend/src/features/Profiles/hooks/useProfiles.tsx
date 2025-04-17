import api from "../../../api";
import { Role } from "../../../models/role";
import { baseUrl } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../App";

const useProfiles = (role: Role = "user", page = 1) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["profiles", role],
    queryFn: () => fetchClients(page),
  });

  const fetchClients = async (page: number = 1) => {
    const response = await api.get(`${baseUrl}/role/${role}/?page=${page}`);
    return response.data;
  };

  const fetchPage = async (page: number) => {
    const data = await queryClient.fetchQuery({
      queryKey: ["profiles", role],
      queryFn: () => fetchClients(page),
    });
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
