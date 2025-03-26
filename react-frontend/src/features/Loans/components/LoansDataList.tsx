import AsyncSelect from "react-select/async";
import { useState } from "react";
import { SingleValue } from "react-select";
import api from "../../../api";
import { Loan } from "../../../models/loan";

interface LoansDataListProps {
  error?: string;
}

interface Option {
  value: string | number;
  label: string;
}

const LoansDataList = ({ error, ...props }: LoansDataListProps) => {
  const [query, setQuery] = useState<Option | null>(null);

  const loadOptions = async (inputValue: string): Promise<Option[]> => {
    const response = await api.get(`loans/${inputValue}/`);

    return response.data.map((item: Loan) => ({
      value: item.id,
      label: item.id,
    }));
  };

  return (
    <>
      <AsyncSelect
        cacheOptions={true}
        defaultOptions
        onChange={(selectedOption: SingleValue<Option> | null) =>
          setQuery(selectedOption)
        }
        loadOptions={loadOptions}
        value={query}
        required
        {...props}
      />
      {error && <p className="text-danger">{error}</p>}
    </>
  );
};

export default LoansDataList;
