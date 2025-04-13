import { User } from "../models/user";

export const toCurrency = (money: number): string => {
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

export const toTitleCase = (str: string) => {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};
