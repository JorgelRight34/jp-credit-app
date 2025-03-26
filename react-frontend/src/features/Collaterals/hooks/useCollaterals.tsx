import { useEffect } from "react";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setCollaterals } from "../collateralsSlice";

const useCollaterals = (query: string = "") => {
  const { collaterals } = useSelector((state: RootState) => state.collaterals);
  const dispatch = useDispatch();

  const fetchCollaterals = async () => {
    const response = await api.get(`collaterals?${query}`);
    dispatch(setCollaterals(response.data));
  };

  useEffect(() => {
    fetchCollaterals();
  }, []);

  return [collaterals];
};

export default useCollaterals;
