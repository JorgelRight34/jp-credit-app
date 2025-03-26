import { useEffect, useState } from "react";
import api from "../../../api";
import { Collateral } from "../../../models/collateral";

const useCollateral = (id?: string) => {
  const [collateral, setCollateral] = useState<Collateral | null>(null);
  const [error, setError] = useState(false);

  const fetchCollateral = () => {
    api
      .get(`collaterals/${id}`)
      .then((res) => setCollateral(res.data))
      .catch(() => setError(true));
  };

  useEffect(() => {
    fetchCollateral();
  }, []);

  return { collateral, error };
};

export default useCollateral;
