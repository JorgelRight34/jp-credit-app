import { useState } from "react";
import api from "../../../api";
import { Loan } from "../../../models/loan";
import { queryClient } from "../../../App";
import { baseUrl } from "../lib/constants";

const useFetchLoan = () => {
  const [loan, setLoan] = useState<Loan | null>(null);

  const getLoan = async (id: string | number) => {
    const response = await api.get(`${baseUrl}/${id}`);
    setLoan(response.data);
    return response.data;
  };

  const fetchLoan = async (id: string | number) => {
    const data = await queryClient.fetchQuery({
      queryKey: ["loan", id],
      queryFn: () => getLoan(id),
    });
    return data;
  };

  return { loan, fetchLoan };
};

export default useFetchLoan;
