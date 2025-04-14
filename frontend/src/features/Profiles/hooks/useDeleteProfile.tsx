import { useDispatch } from "react-redux";
import api from "../../../api";
import { removeAdmin, removeClient, removeLoanOfficer } from "../profilesSlice";
import { Role } from "../../../models/role";
import { useNavigate } from "react-router";
import { baseUrl } from "../lib/constants";

const useDeleteProfile = (role: Role) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteClient = async (id: string) => {
    const response = await api.delete(`${baseUrl}/${id}`);

    switch (role) {
      case "user":
        dispatch(removeClient(response.data));
        break;
      case "loanOfficer":
        dispatch(removeLoanOfficer(response.data));
        break;
      case "admin":
        dispatch(removeAdmin(response.data));
        break;
      default:
        dispatch(removeClient(response.data));
    }

    navigate("/profiles");
  };

  return [deleteClient];
};

export default useDeleteProfile;
