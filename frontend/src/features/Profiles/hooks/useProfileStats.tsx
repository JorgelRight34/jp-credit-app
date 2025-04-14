import { useEffect, useState } from "react";
import api from "../../../api";
import { ProfileStats } from "../../../models/profileStats";
import { baseUrl } from "../lib/constants";

const useProfileStats = (username: string) => {
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const fetchStats = async () => {
    const response = await api.get(`${baseUrl}/${username}/stats`);
    setStats(response.data);
  };
  useEffect(() => {
    fetchStats();
  }, []);

  return [stats];
};

export default useProfileStats;
