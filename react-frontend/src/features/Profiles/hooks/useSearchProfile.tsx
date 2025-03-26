import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../../api";
import { setAdmins, setClients, setLoanOfficers } from "../profilesSlice";
import { Role } from "../../../models/role";

const useSearchProfile = (role: Role, field: "firstname" | "lastname") => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const fetchProfiles = async () => {
    const response = await api.get(`users/role/${role}/?${field}=${query}`);

    switch (role) {
      case "user":
        dispatch(setClients(response.data));
        break;
      case "loanOfficer":
        dispatch(setLoanOfficers(response.data));
        break;
      case "admin":
        dispatch(setAdmins(response.data));
        break;
      default:
        dispatch(setClients(response.data));
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return { query, setQuery, handleOnChange, fetchProfiles };
};

export default useSearchProfile;
