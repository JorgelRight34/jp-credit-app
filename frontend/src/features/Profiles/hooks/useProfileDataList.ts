import { useState } from "react";
import { User } from "../../../models/user";
import { Role } from "../../../models/role";
import api from "../../../api";
import { useQueryClient } from "@tanstack/react-query";
import { Option } from "../../../models/option";

const useProfileDataList = (role: Role = "user") => {
    const [query, setQuery] = useState<Option | null>(null);
    const [options, setOptions] = useState<Option[]>([]);
    const [error, setError] = useState(false);
    const queryClient = useQueryClient();

    const getLabel = (profile: User) => {
        return `${profile.firstName} | ${profile.lastName}`;
    }

    const getUsersByQuery = async (inputValue: string) => {
        // Fetch data from the api
        const response = await api.get(
            `users/role/${role}/?firstname=${inputValue}&lastname=${inputValue}`
        );
        return response.data;
    }

    const getUsersByLoanId = async (loanId: number | string) => {
        const response = await api.get(`/loans/${loanId}/members`);
        return response.data
    }

    const loadOptions = async (inputValue: string): Promise<Option[]> => {
        const data = await queryClient.fetchQuery({
            queryKey: ["profiles", query],
            queryFn: () => getUsersByQuery(inputValue)
        });

        return data.map((item: User) => ({
            value: item.id,
            label: `${item.firstName} | ${item.lastName}`,
        }));
    };

    const loadLoanProfiles = async (loanId: number | string) => {
        setOptions([])  // Reset after changing loanId to prevent having the previous options
        setError(false);
        try {
            const data = await queryClient.fetchQuery({
                queryKey: ["loans", "members", loanId],
                queryFn: () => getUsersByLoanId(loanId),

            });

            const profiles = [
                ['client', '(Cliente)'],
                ['guarantor', '(Garante)'],
                ['loanOfficer', '(Agente)']
            ].map(([key, role]) => ({
                value: data[key].id,
                label: `${getLabel(data[key])} ${role}`,
            }));

            setOptions(profiles);
            return profiles;
        } catch {
            setError(true)
        }
    }

    return { loadOptions, loadLoanProfiles, setQuery, query, options, error }
}


export default useProfileDataList;