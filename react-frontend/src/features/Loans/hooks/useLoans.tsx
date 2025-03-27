import { useEffect } from "react";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setLoans } from "../loansSlice";
import { baseUrl } from "../lib/constants";

const useLoans = (query: string = "") => {
  const { loans } = useSelector((state: RootState) => state.loans);
  const dispatch = useDispatch();

  const fetchLoans = async () => {
    const response = await api.get(`${baseUrl}/?limit=50&${query}`);
    dispatch(setLoans(response.data));
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return [loans];
};

export default useLoans;
