import { useState } from "react";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { setLoans } from "../loansSlice";
import { RootState } from "../../../store";
import { baseUrl } from "../lib/constants";

export interface SearchLoanQuery {
  id: string | number;
  startDate: string;
  endDate: string;
  type: string;
}

const useSearchLoan = () => {
  const [query, setQuery] = useState<SearchLoanQuery>({
    id: 0,
    startDate: "",
    endDate: "",
    type: "active",
  });
  const { loans } = useSelector((state: RootState) => state.loans);
  const dispatch = useDispatch();

  const search = async (fetchData: boolean = true) => {
    if (query.id && query.id !== "0") {
      searchById(Number(query.id));
      return;
    }

    if (!fetchData) return;
    // If item not in memory then fetch it
    const response = await api.get(
      `${baseUrl}/?${Object.keys(query)
        .map((key) => `${key}=${query[key as keyof typeof query]}`)
        .join("&")}`
    );
    dispatch(setLoans(response.data ? response.data : []));
  };

  const searchById = async (id: number) => {
    // Try to find item on memory first
    if (id == 0) return;
    const found = loans.find((loan) => loan.id == id);
    if (found) {
      dispatch(setLoans([found]));
      return;
    }

    // If item not in memory then fetch it
    const response = await api.get(`${baseUrl}/${query.id}`);
    dispatch(setLoans(response.data ? [response.data] : []));
    return;
  };

  const handleOnChange = (
    target: keyof SearchLoanQuery,
    value: string | number
  ) => {
    setQuery((prev) => ({ ...prev, [target]: value }));
  };

  return { query, search, handleOnChange };
};

export default useSearchLoan;
