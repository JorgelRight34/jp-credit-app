import api from "../../../api";
import { baseUrl } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";

const useProfile = (username: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => fetchProfile(username),
  });

  const fetchProfile = async (username: string) => {
    const response = await api.get(`${baseUrl}/${username}`);
    return response.data;
  };

  return { profile: data, isError, isLoading };
};

export default useProfile;
