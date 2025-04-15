import { Loan } from "../../../models/loan";

interface TransactionFormDetailsProps {
  loan: Loan;
  amount: number;
}

const TransactionFormDetails = ({
  amount,
  loan,
}: TransactionFormDetailsProps) => {
  return (
    <>
      <b>amount</b> {amount}
      <b>interest</b> {loan.annualInterestRate}
      <b>cuota:</b> {loan.paymentValue}
      <>total atraso:</>{" "}
      {loan.transactions?.reduce((prev, curr) => curr.delinquency + prev, 0)}
      <b>Pago #</b>{" "}
      {loan.transactions?.length ? loan.transactions.length + 1 : 1}
      <b>Capital:</b> {amount - amount * loan.annualInterestRate}
      <b>Montos pagados</b>
      <b>capital:</b> {loan.disbursedAmount - loan.principalBalance}
      <b>interes:</b> {loan.accruedInterest}
      <b>Mora:</b>{" "}
      {loan.transactions?.reduce((prev, curr) => curr.penaltyFee + prev, 0)}
      <b>ultimo pago:</b> {loan.lastPaymentDate || "---"}
    </>
  );
};

export default TransactionFormDetails;
