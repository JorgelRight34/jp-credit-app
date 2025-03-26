import { useDispatch } from "react-redux";
import api from "../../../api.tsx";
import {
  addAdmin,
  addClient,
  addGuarantor,
  addLoanOfficer,
} from "../profilesSlice.tsx";
import { ProfileFormValues } from "../lib/constants.tsx";
import { Role } from "../../../models/role.tsx";

const useNewProfile = (role: Role) => {
  const dispatch = useDispatch();

  const addNewprofile = async (data: ProfileFormValues) => {
    const response = await api.post("users/register", {
      ...data,
      roles: [role],
    });

    switch (role) {
      case "user":
        dispatch(addClient(response.data));
        break;
      case "loanOfficer":
        dispatch(addLoanOfficer(response.data));
        break;
      case "admin":
        dispatch(addAdmin(response.data));
        break;
      case "guarantor":
        dispatch(addGuarantor(response.data));
        break;
      default:
        dispatch(addClient(response.data));
    }

    return response.data;
  };

  return [addNewprofile];
};

export default useNewProfile;
