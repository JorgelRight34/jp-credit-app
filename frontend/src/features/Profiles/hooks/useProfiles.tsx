import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import {
  setClients,
  setLoanOfficers,
  setAdmins,
  setGuarantors,
  setProfiles,
} from "../profilesSlice";
import { RootState } from "../../../store";
import { Role } from "../../../models/role";
import { baseUrl } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../App";
import { User } from "../../../models/user";

const useProfiles = (role: Role = "user", page = 1) => {
  const profiles = useSelector((state: RootState) => state.profiles);
  const { isError, isLoading } = useQuery({
    queryKey: ["profiles", role],
    queryFn: () => fetchClients(page),
  });
  const dispatch = useDispatch();

  const fetchClients = async (page: number = 1) => {
    const response = await api.get(`${baseUrl}/role/${role}/?page=${page}`);
    setCorrectProfiles(role, response.data);

    return response.data;
  };

  const fetchPage = async (page: number) => {
    const data = await queryClient.fetchQuery({
      queryKey: ["profiles", role],
      queryFn: () => fetchClients(page),
    });
    setCorrectProfiles(role, data);
    return data;
  };

  const setCorrectProfiles = (role: Role, data: User[]) => {
    switch (role) {
      case "client":
        dispatch(setClients(data));
        break;
      case "loanOfficer":
        dispatch(setLoanOfficers(data));
        break;
      case "admin":
        dispatch(setAdmins(data));
        break;
      case "user":
        dispatch(setProfiles(data));
        break;
      case "guarantor":
        dispatch(setGuarantors(data));
        break;
      default:
        dispatch(setClients(data));
    }
  };

  return {
    profiles: profiles[`${role}s` as keyof typeof profiles],
    isError,
    isLoading,
    fetchPage,
  };
};

export default useProfiles;
