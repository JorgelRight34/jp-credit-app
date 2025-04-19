import { Row } from "@tanstack/react-table";
import { User } from "../models/user";

export const toCurrency = (money: number | undefined): string | number => {
  if (money === undefined) return NaN;
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(money);

  return formattedAmount;
};

export const toFormattedDate = (date: string | Date): string => {
  if (!(date instanceof Date)) date = new Date(date);

  if (isNaN(date.getTime())) return "---";

  try {
    const formattedDate = new Intl.DateTimeFormat("fr-FR").format(date);
    return formattedDate;
  } catch {
    return date.toString();
  }
};

export const getFullName = (user?: User): string => {
  if (!user) return "";

  return `${user?.firstName} ${user?.lastName}`;
};

export const getFirstAndLastName = (user?: User): string => {
  if (!user) return "";
  const firstName = user.firstName.split(" ")[0];
  const lastName = user.lastName.split(" ")[0];

  return `${firstName} ${lastName}`;
};

export const toTitleCase = (str: string) => {
  if (!str) return;
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getTodayFormattedDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const dd = String(today.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};

export const sortDateRows = <TData,>(
  rowA: Row<TData>,
  rowB: Row<TData>,
  columnId: string
) => {
  const dateA = new Date(rowA.getValue(columnId));
  const dateB = new Date(rowB.getValue(columnId));
  return dateA.getTime() - dateB.getTime();
};

export const getAge = (dateOfBirth: Date) => {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const month = today.getMonth() - dateOfBirth.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate()))
    age--;

  return age;
};

export const getPmt = (
  annualInterestRate: number,
  paymentFrequency: number,
  nPer: number,
  amount: number
) => {
  const r = annualInterestRate / paymentFrequency; // Interest rate per period
  const n = nPer; // Total number of payments

  if (r === 0) return amount / n; // No interest

  // PMT formula
  const pmt = (r * amount) / (1 - Math.pow(1 + r, -n));
  return Number(pmt.toFixed(2));
};

export const getTotalInterest = (
  pmt: number,
  paymentFrequency: number,
  amount: number
) => {
  const total = pmt * paymentFrequency - amount;
  return total;
};
