import api from "../../../api.tsx";
import { baseUrl, ProfileFormValues } from "../lib/constants.tsx";
import { Role } from "../../../models/role.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "../../../models/user.ts";

const useNewProfile = (role: Role) => {
  const queryClient = useQueryClient();

  const addNewprofile = async (data: ProfileFormValues) => {
    const response = await api.post(`${baseUrl}/register`, {
      ...data,
      roles: [role],
    });

    // Update list
    console.log(queryClient.getQueryData(["profiles", role]));
    queryClient.setQueryData<User[]>(["profiles", role], (prev) => [
      ...(prev || []),
      response.data,
    ]);

    // Set individual
    queryClient.setQueryData<User>(
      ["profiles", response.data.id],
      response.data
    );

    return response.data;
  };

  return [addNewprofile];
};

export default useNewProfile;
