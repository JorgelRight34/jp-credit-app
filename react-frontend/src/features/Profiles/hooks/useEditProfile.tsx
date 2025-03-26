import { useDispatch } from "react-redux";
import { ProfileFormValues } from "../lib/constants.tsx";
import api from "../../../api.tsx";
import {
  updateAdmin,
  updateClient,
  updateLoanOfficer,
} from "../profilesSlice.tsx";
import { Role } from "../../../models/role.tsx";

const useEditProfile = (id: string, role: Role) => {
  const dispatch = useDispatch();

  const editClient = async (data: ProfileFormValues) => {
    const response = await api.put(`users/${id}`, data);

    switch (role) {
      case "user":
        dispatch(updateClient(response.data));
        break;
      case "loanOfficer":
        dispatch(updateLoanOfficer(response.data));
        break;
      case "admin":
        dispatch(updateAdmin(response.data));
        break;
      default:
        dispatch(updateClient(response.data));
    }

    window.location.reload();
    return response.data;
  };

  return [editClient];
};

export default useEditProfile;
