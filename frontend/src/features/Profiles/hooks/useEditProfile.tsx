import { baseUrl, ProfileFormValues } from "../lib/constants.tsx";
import api from "../../../api.tsx";
import { Role } from "../../../models/role.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "../../../models/user.ts";

const useEditProfile = (role: Role) => {
  const queryClient = useQueryClient();

  const editClient = async (data: ProfileFormValues, username: string) => {
    const response = await api.put(`${baseUrl}/${username}`, data);
    const d = response.data;

    // Update list
    queryClient.setQueryData<User[]>([role], (prev) =>
      prev ? prev.map((el) => (el.id === d.username ? d : el)) : [data]
    );

    // Update individual
    queryClient.setQueryData<User>([role], d);

    return response.data;
  };

  return [editClient];
};

export default useEditProfile;
