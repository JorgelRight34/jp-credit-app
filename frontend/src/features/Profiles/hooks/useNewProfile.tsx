import { useDispatch } from "react-redux";
import api from "../../../api.tsx";
import {
  addAdmin,
  addClient,
  addGuarantor,
  addLoanOfficer,
  addProfile,
} from "../profilesSlice.tsx";
import { baseUrl, ProfileFormValues } from "../lib/constants.tsx";
import { Role } from "../../../models/role.tsx";

const useNewProfile = (role: Role) => {
  const dispatch = useDispatch();

  const addNewprofile = async (data: ProfileFormValues) => {
    const response = await api.post(`${baseUrl}/register`, {
      ...data,
      roles: [role],
    });

    switch (role) {
      case "user":
        dispatch(addProfile(response.data));
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
    dispatch(addProfile(response.data));

    return response.data;
  };

  return [addNewprofile];
};

export default useNewProfile;
