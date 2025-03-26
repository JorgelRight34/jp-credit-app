import { useDispatch } from "react-redux";
import api from "../../../api";
import { removeClient } from "../profilesSlice";

const useDeleteProfile = (id: string) => {
  const dispatch = useDispatch();

  const deleteClient = async () => {
    const response = await api.delete(`users/${id}`);
    dispatch(removeClient(response.data));
  };

  return [deleteClient];
};

export default useDeleteProfile;
