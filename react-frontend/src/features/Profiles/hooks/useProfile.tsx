import { useEffect, useState } from "react";
import api from "../../../api";
import { Client } from "../../../models/client";
import { baseUrl } from "../lib/constants";

const useProfile = (username: string) => {
  const [profile, setProfile] = useState<Client | null>(null);
  const [error, setError] = useState(false);

  const fetchProfile = () => {
    api
      .get(`${baseUrl}/${username}`)
      .then((res) => setProfile(res.data))
      .catch(() => setError(true));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, error };
};

export default useProfile;
