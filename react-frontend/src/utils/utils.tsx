export const toCurrency = (money: number): string => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(money);

  return formattedAmount;
};

export const toFormattedDate = (date: Date): string => {
  const formattedDate = new Intl.DateTimeFormat("fr-FR").format(date);
  return formattedDate;
};
