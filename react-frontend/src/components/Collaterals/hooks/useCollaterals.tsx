import { useEffect, useState } from "react";
import api from "../../../api";
import { Collateral } from "../../../models/collateral";

const useCollaterals = () => {
  const [collaterals, setCollaterals] = useState<Collateral[]>([]);

  const fetchCollaterals = async () => {
    const response = await api.get("collaterals");
    setCollaterals(response.data);
  };

  useEffect(() => {
    fetchCollaterals();
  }, []);

  return [collaterals];
};

export default useCollaterals;
