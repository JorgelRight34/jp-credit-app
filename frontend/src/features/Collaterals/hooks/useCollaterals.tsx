import { useEffect } from "react";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setCollaterals } from "../collateralsSlice";
import { Collateral } from "../../../models/collateral";

const useCollaterals = (
  query: string = ""
): [Collateral[], (page: number) => Promise<void>] => {
  const { collaterals } = useSelector((state: RootState) => state.collaterals);
  const dispatch = useDispatch();

  const fetchCollaterals = async (page: number = 1) => {
    const response = await api.get(`collaterals?page=${page}&${query}`);
    dispatch(setCollaterals(response.data));
  };

  useEffect(() => {
    fetchCollaterals();
  }, []);

  return [collaterals, fetchCollaterals];
};

export default useCollaterals;
