import { useDispatch } from "react-redux";
import api from "../../../api";
import { removeAdmin, removeClient, removeLoanOfficer } from "../profilesSlice";
import { Role } from "../../../models/role";
import { useNavigate } from "react-router";

const useDeleteProfile = (role: Role, id: string) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteClient = async () => {
    const response = await api.delete(`users/${id}`);

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
