import { useEffect } from "react";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setLoans } from "../loansSlice";
import { baseUrl } from "../lib/constants";
import { Loan } from "../../../models/loan";

const useLoans = (
  query: string = ""
): [Loan[], (page: number) => Promise<void>] => {
  const { loans } = useSelector((state: RootState) => state.loans);
  const dispatch = useDispatch();

  const fetchLoans = async (page: number = 1) => {
    const response = await api.get(
      `${baseUrl}/?page=${page}&limit=50&${query}`
    );
    dispatch(setLoans(response.data));
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return [loans, fetchLoans];
};

export default useLoans;
