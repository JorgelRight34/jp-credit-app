import { useDispatch } from "react-redux";
import api from "../../../api";
import { addClient, addLoanOfficer } from "../clientsSlice";

const useNewClient = (roles: string[]) => {
  const dispatch = useDispatch();

  const addNewClient = async (data: any) => {
    const response = await api.post("users/register", {
      ...data,
      roles: roles,
    });
    switch (roles[0]) {
      case "user":
        dispatch(addClient(response.data));
        break;
      case "loanOfficer":
        dispatch(addLoanOfficer(response.data));
        break;
      default:
        dispatch(addClient(response.data));
    }
  };

  return [addNewClient];
};

export default useNewClient;
