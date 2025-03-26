import { useState } from "react";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { setLoans } from "../loansSlice";
import { RootState } from "../../../store";

const useSearchLoan = () => {
  const [id, setId] = useState<number | null>(null);
  const { loans } = useSelector((state: RootState) => state.loans);
  const dispatch = useDispatch();

  const search = async () => {
    // Try to find item on memory first
    const found = loans.find((loan) => loan.id == id);

    if (found) {
      dispatch(setLoans(found));
      return;
    }

    // If item not in memory then fetch it
    const response = await api.get(`loans/${id}`);
    dispatch(setLoans([response.data]));
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(Number(event.target.value));
  };

  return { id, search, handleOnChange };
};

export default useSearchLoan;
