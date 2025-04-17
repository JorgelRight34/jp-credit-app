import { useState } from "react";
import api from "../../../api";
import { Role } from "../../../models/role";
import { baseUrl } from "../lib/constants";
import { useQueryClient } from "@tanstack/react-query";

const useSearchProfile = (role: Role, field: "firstname" | "lastname") => {
  const [query, setQuery] = useState("");
  const queryClient = useQueryClient();

  const handleFetchProfiles = async () => {
    const response = await api.get(
      `${baseUrl}/role/${role}/?${field}=${query}`
    );
    return response.data;
  };

  const fetchProfiles = async () => {
    const data = await queryClient.fetchQuery({
      queryKey: ["profiles", role],
      queryFn: handleFetchProfiles,
    });
    return data;
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return { query, setQuery, handleOnChange, fetchProfiles };
};

export default useSearchProfile;
