import { useEffect, useState } from "react";
import api from "../../../api";
import { Client } from "../../../models/client";

const useProfile = (username: string) => {
  const [profile, setProfile] = useState<Client | null>(null);

  const fetchProfile = async () => {
    const response = await api.get(`users/${username}`);
    setProfile(response.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return [profile];
};

export default useProfile;
