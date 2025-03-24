import { useDispatch } from "react-redux";
import api from "../../../api";
import { setClients } from "../clientsSlice";
import { useEffect, useState } from "react";
import { Client } from "../../../models/client";

const useClients = () => {
  const [clientsList, setClientsList] = useState<Client[]>([]);
  const dispatch = useDispatch();

  const fetchClients = async () => {
    const response = await api.get("users/role/user");
    dispatch(setClients(response.data));
    setClientsList(response.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return [clientsList];
};

export default useClients;
