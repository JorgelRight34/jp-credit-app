import React, { useState } from "react";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { setCollaterals } from "../collateralsSlice";
import { RootState } from "../../../store";

const useSearchCollateral = () => {
  const [query, setQuery] = useState<number | null>();
  const { collaterals } = useSelector((state: RootState) => state.collaterals);
  const dispatch = useDispatch();

  const search = async () => {
    // Try to find item in memory
    const found = collaterals.find((collateral) => collateral.id === query);
    if (found) {
      dispatch(setCollaterals(found));
      return;
    }

    // If item not in memory fetch it
    const response = await api.get(`collaterals/?title=${query}`);
    dispatch(setCollaterals(response.data));
  };

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (isNaN(Number(value))) return;
    setQuery(value);
  };

  return { query, handleOnChange, search };
};

export default useSearchCollateral;
