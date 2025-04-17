import { useQueryClient } from "@tanstack/react-query";
import api from "../../../api";
import { Role } from "../../../models/role";
import { baseUrl } from "../lib/constants";
import { User } from "../../../models/user";

const useDeleteProfile = (role: Role) => {
  const queryClient = useQueryClient();

  const deleteClient = async (id: string) => {
    const response = await api.delete(`${baseUrl}/${id}`);

    // Update list
    queryClient.setQueryData<User[]>([role], (prev) => [
      ...(prev || []),
      response.data,
    ]);

    // Remove individual
    queryClient.setQueryData<User>([role, id], undefined);
  };

  return [deleteClient];
};

export default useDeleteProfile;
