import api from "../../../api";
import { useEffect, useState } from "react";
import { Transaction } from "../../../models/transaction";

const useTransaction = (id: number) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const fetchTransaction = async () => {
    const response = await api.get(`transactions/${id}`);
    setTransaction(response.data);
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  return [transaction];
};

export default useTransaction;
