import { useDispatch } from "react-redux";
import api from "../../../api.tsx";
import { addAdmin, addClient, addLoanOfficer } from "../profilesSlice.tsx";
import { ProfileFormValues } from "../lib/constants.tsx";
import { Role } from "../../../models/role.tsx";

const useNewProfile = (roles: Role[]) => {
  const dispatch = useDispatch();

  const addNewprofile = async (data: ProfileFormValues) => {
    const response = await api.post("users/register", {
      ...data,
      roles: roles,
    });
    switch (roles[0]) {
      case "user":
        dispatch(addClient(response.data));
        break;
      case "loanOfficer":
        dispatch(addLoanOfficer(response.data));
        break;
      case "admin":
        dispatch(addAdmin(response.data));
        break;
      default:
        dispatch(addClient(response.data));
    }
  };

  return [addNewprofile];
};

export default useNewProfile;
