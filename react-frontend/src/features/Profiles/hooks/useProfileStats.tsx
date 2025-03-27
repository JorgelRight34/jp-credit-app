import { useEffect, useState } from "react";
import api from "../../../api";
import { ProfileStats } from "../../../models/profileStats";

const useProfileStats = (username: string) => {
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const fetchStats = async () => {
    const response = await api.get(`users/${username}/stats`);
    setStats(response.data);
  };
  useEffect(() => {
    fetchStats();
  }, []);

  return [stats];
};

export default useProfileStats;
