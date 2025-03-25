import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import { setClients } from "../clientsSlice";
import { useEffect } from "react";
import { RootState } from "../../../store";

const useClients = () => {
  const { clients } = useSelector((state: RootState) => state.clients);
  const dispatch = useDispatch();

  const fetchClients = async () => {
    const response = await api.get("users/role/user");
    dispatch(setClients(response.data));
    setClients(response.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return [clients];
};

export default useClients;
