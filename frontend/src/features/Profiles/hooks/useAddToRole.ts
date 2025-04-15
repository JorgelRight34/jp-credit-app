import { useDispatch } from "react-redux";
import api from "../../../api";
import {
  addAdmin,
  addClient,
  addGuarantor,
  addLoanOfficer,
} from "../profilesSlice";

type UseAddToRoleReturn = [(username: string, role: string) => Promise<void>];

const useAddToRole = (): UseAddToRoleReturn => {
  const dispatch = useDispatch();

  const addToRole = async (username: string, role: string) => {
    if (role === "user" || role === "profile") return;

    if (!confirm(`¿Está seguro que desea agregar este usuario al rol ${role}?`))
      return;

    const response = await api.put(`users/${username}/roles/${role}`);

    switch (role) {
      case "client":
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
  };

  return [addToRole];
};

export default useAddToRole;
