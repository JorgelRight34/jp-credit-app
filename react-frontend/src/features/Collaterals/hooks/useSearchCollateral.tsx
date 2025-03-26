import React, { useState } from "react";
import api from "../../../api";
import { useDispatch } from "react-redux";
import { setCollaterals } from "../collateralsSlice";

const useSearchCollateral = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const search = async () => {
    const response = await api.get(`collaterals/?title=${query}`);
    dispatch(setCollaterals(response.data));
  };

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return { query, handleOnChange, search };
};

export default useSearchCollateral;
