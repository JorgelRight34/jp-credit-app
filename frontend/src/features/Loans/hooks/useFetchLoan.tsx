import { useState } from "react";
import api from "../../../api";
import { Loan } from "../../../models/loan";
import { baseUrl } from "../lib/constants";
import { useQueryClient } from "@tanstack/react-query";

const useFetchLoan = () => {
  const [loan, setLoan] = useState<Loan | null>(null);
  const queryClient = useQueryClient();

  const getLoan = async (id: string | number) => {
    const response = await api.get(`${baseUrl}/${id}`);
    return response.data;
  };

  const fetchLoan = async (id: string | number) => {
    const data = await queryClient.fetchQuery({
      queryKey: ["loans", id],
      queryFn: () => getLoan(id),
    });
    setLoan(data);
    return data;
  };

  return { loan, fetchLoan };
};

export default useFetchLoan;
