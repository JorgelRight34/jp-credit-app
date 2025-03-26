import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import { setClients, setLoanOfficers, setAdmins } from "../profilesSlice";
import { useEffect } from "react";
import { RootState } from "../../../store";
import { Role } from "../../../models/role";

const useProfiles = (role: Role = "user") => {
  const profiles = useSelector((state: RootState) => state.profiles);
  const dispatch = useDispatch();

  const fetchClients = async () => {
    const response = await api.get(`users/role/${role}`);

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
      default:
        dispatch(setClients(response.data));
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return [profiles[`${role}s` as keyof typeof profiles]];
};

export default useProfiles;
