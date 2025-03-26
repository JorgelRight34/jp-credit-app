import { useState } from "react";
import api from "../../../api";
import { useDispatch } from "react-redux";
import { setLoans } from "../loansSlice";

const useSearchLoan = () => {
  const [query, setQuery] = useState<number | null>(null);
  const dispatch = useDispatch();

  const search = async () => {
    const response = await api.get(`loans/${query}`);
    dispatch(setLoans([response.data]));
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(Number(event.target.value));
  };

  return { query, search, handleOnChange };
};

export default useSearchLoan;
