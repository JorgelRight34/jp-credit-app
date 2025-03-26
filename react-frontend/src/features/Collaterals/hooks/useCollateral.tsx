import { useEffect, useState } from "react";
import api from "../../../api";
import { Collateral } from "../../../models/collateral";

const useCollateral = (id?: string) => {
  const [collateral, setCollateral] = useState<Collateral | null>(null);

  const fetchCollateral = async () => {
    const response = await api.get(`collaterals/${id}`);
    setCollateral(response.data);
  };

  useEffect(() => {
    fetchCollateral();
  }, []);

  return [collateral];
};

export default useCollateral;
