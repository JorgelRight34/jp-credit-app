import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import {
  setClients,
  setLoanOfficers,
  setAdmins,
  setGuarantors,
} from "../profilesSlice";
import { useEffect } from "react";
import { RootState } from "../../../store";
import { Role } from "../../../models/role";
import { baseUrl } from "../lib/constants";
import { User } from "../../../models/user";

const useProfiles = (
  role: Role = "user"
): [User[], (page: number) => Promise<void>] => {
  const profiles = useSelector((state: RootState) => state.profiles);
  const dispatch = useDispatch();

  const fetchClients = async (page: number = 1) => {
    const response = await api.get(`${baseUrl}/role/${role}/?page=${page}`);

    switch (role) {
      case "client":
        dispatch(setClients(response.data));
        break;
      case "loanOfficer":
        dispatch(setLoanOfficers(response.data));
        break;
      case "admin":
        dispatch(setAdmins(response.data));
        break;
      case "guarantor":
        dispatch(setGuarantors(response.data));
        break;
      default:
        dispatch(setClients(response.data));
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return [profiles[`${role}s` as keyof typeof profiles], fetchClients];
};

export default useProfiles;
