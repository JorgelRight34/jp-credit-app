import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import { useEffect } from "react";
import { RootState } from "../../../store";
import { setLoanOfficers } from "../clientsSlice";

const useLoanOfficers = () => {
  const { loanOfficers } = useSelector((state: RootState) => state.clients);
  const dispatch = useDispatch();

  const fetchLoanOfficers = async () => {
    const response = await api.get("users/role/loanOfficer");
    dispatch(setLoanOfficers(response.data));
  };

  useEffect(() => {
    fetchLoanOfficers();
  }, []);

  return [loanOfficers];
};

export default useLoanOfficers;
