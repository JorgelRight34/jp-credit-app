import { useState } from "react";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { setLoans } from "../loansSlice";
import { RootState } from "../../../store";
import { baseUrl } from "../lib/constants";

const useSearchLoan = () => {
  const [id, setId] = useState<number>(0);
  const { loans } = useSelector((state: RootState) => state.loans);
  const dispatch = useDispatch();

  const search = async (fetchData: boolean = true) => {
    // Try to find item on memory first
    const found = loans.find((loan) => loan.id == id);

    if (found) {
      dispatch(setLoans(found));
      return;
    }

    if (!fetchData) return;

    // If item not in memory then fetch it
    const response = await api.get(`${baseUrl}/${id}`);
    dispatch(setLoans(response.data ? [response.data] : []));
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(event.target.value));
  };

  return { id, search, handleOnChange };
};

export default useSearchLoan;
