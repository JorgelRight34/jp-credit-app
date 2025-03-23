import { useEffect, useState } from "react";
import { Loan } from "../../../models/loan";
import api from "../../../api";

const useLoan = (id: string) => {
  const [loan, setLoan] = useState<Loan | undefined>();

  const fetchLoan = async () => {
    const response = await api.get(`loans/${id}`);
    const data: Loan = response.data;
    console.dir(response.data, { depth: null });
    setLoan({ ...data, createdAt: new Date(data.createdAt) });
  };

  useEffect(() => {
    fetchLoan();
  }, []);

  return [loan];
};

export default useLoan;
