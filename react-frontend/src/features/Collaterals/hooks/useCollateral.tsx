import { useEffect, useState } from "react";
import api from "../../../api";
import { Collateral } from "../../../models/collateral";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const useCollateral = (id?: string) => {
  const [collateral, setCollateral] = useState<Collateral | null>(null);
  const [error, setError] = useState(false);
  const { collaterals } = useSelector((state: RootState) => state.collaterals);

  const fetchCollateral = () => {
    // Try to find item in memory
    const found = collaterals.find(
      (collateral) => collateral.id === Number(id)
    );
    if (found) {
      setCollateral(found);
      return;
    }

    // If item not in memory fetch it
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
