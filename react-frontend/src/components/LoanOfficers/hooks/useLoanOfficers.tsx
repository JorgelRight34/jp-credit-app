import { useDispatch } from "react-redux";
import api from "../../../api";
import { useEffect, useState } from "react";
import { setLoanOfficers } from "../loanOfficersSlice";
import { LoanOfficer } from "../../../models/loanOfficer";

const useLoanOfficers = () => {
  const [loanOfficersList, setLoanOfficersList] = useState<LoanOfficer[]>([]);
  const dispatch = useDispatch();

  const fetchClients = async () => {
    const response = await api.get("users/role/loanOfficer");
    dispatch(setLoanOfficers(response.data));
    setLoanOfficersList(response.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return [loanOfficersList];
};

export default useLoanOfficers;
