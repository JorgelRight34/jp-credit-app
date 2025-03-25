import { useEffect, useState } from "react";
import api from "../../../api";
import { Client } from "../../../models/client";

const useClient = (username: string) => {
  const [client, setClient] = useState<Client | null>(null);

  const fetchClient = async () => {
    const response = await api.get(`users/${username}`);
    setClient(response.data);
  };

  useEffect(() => {
    fetchClient();
  }, []);

  return [client];
};

export default useClient;
