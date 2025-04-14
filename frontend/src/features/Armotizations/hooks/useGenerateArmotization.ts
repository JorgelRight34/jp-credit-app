import { useState } from "react"
import api from "../../../api";
import { ArmotizationPayment } from "../../../models/armotizationPayment";
import { baseUrl } from "../lib/constants";

interface UseGenerateArmotizationReturn {
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    armotization: ArmotizationPayment[] | undefined;
    form: {
        principalBalance: number;
        annualInterestRate: number;
        paymentFrequency: number;
        numberOfPayments: number;
    }
}

/**
 * `useGenerateArmotization` is a custom React hook for managing a loan amortization form.
 * 
 * It handles:
 * - Form state (`form`): Includes fields like principal balance, interest rate, frequency, and number of payments.
 * - Input changes (`handleOnChange`): Updates the form state when the user modifies an input field.
 * - Form submission (`handleOnSubmit`): Sends a GET request to fetch the amortization schedule
 *   based on the form parameters, and stores the result in state.
 * 
 * The hook returns the form state, a list of amortization payments, and handlers for input changes and form submission.
 * 
 * @returns {{
*   handleOnChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
*   handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
*   armotization: ArmotizationPayment[] | undefined;
*   form: {
*     principalBalance: number;
*     annualInterestRate: number;
*     paymentFrequency: number;
*     numberOfPayments: number;
*   };
* }}
* 
* @example
* const {
*   handleOnChange,
*   handleOnSubmit,
*   armotization,
*   form
* } = useGenerateArmotization();
*/
const useGenerateArmotization = (): UseGenerateArmotizationReturn => {
    const [form, setForm] = useState({
        principalBalance: 0,
        annualInterestRate: 0,
        paymentFrequency: 12,
        numberOfPayments: 12
    })
    const [armotization, setArmotization] = useState<ArmotizationPayment[]>()

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = event.target.name;
        const value = Number(event.target.value);
        if (isNaN(value)) return;

        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const query: string = Object.keys(form).map(key => `${key}=${form[key as keyof typeof form]}`).join('&');
        const response = await api.get(`${baseUrl}/?${query}`);
        setArmotization(response.data);
    }

    return { handleOnChange, handleOnSubmit, armotization, form }
}

export default useGenerateArmotization;