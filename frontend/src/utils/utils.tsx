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

export const toFormattedDate = (date: Date): string => {
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
