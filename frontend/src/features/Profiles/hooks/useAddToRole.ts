import api from "../../../api";
import { roleSpanishTranslations } from "../../../utils/constants";
import { Role } from "../../../models/role";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "../../../models/user";

type UseAddToRoleReturn = [(username: string, role: Role) => Promise<void>];

const useAddToRole = (): UseAddToRoleReturn => {
  const queryClient = useQueryClient();

  const addToRole = async (username: string, role: Role) => {
    if (role === "user" || role === "profile") return;

    if (!confirm(`¿Está seguro que desea agregar este usuario al rol ${roleSpanishTranslations[role]}?`))
      return;

    const response = await api.put(`users/${username}/roles/${role}`);
    queryClient.setQueryData<User[]>([role], (prev) => [...(prev || []), response.data])
  };

  return [addToRole];
};

export default useAddToRole;
