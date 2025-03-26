import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import { setAdmins, setClients, setLoanOfficers } from "../profilesSlice";
import { Role } from "../../../models/role";
import { RootState } from "../../../store";

const useSearchProfile = (role: Role, field: "firstname" | "lastname") => {
  const [query, setQuery] = useState("");
  const profiles = useSelector((state: RootState) => state.profiles);
  const dispatch = useDispatch();

  const fetchProfiles = async () => {
    // Try to find item in memory
    const found = profiles[role as keyof typeof profiles].find(
      (profile) => profile[field as keyof typeof profile] === query
    );
    if (found) {
      dispatch(setClients(found));
      return;
    }

    // If item not in memory then fetch it
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
