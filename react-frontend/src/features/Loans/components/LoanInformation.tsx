import { Loan } from "../../../models/loan";

interface LoanInformationProps {
  loan: Loan;
}

const LoanInformation = ({ loan }: LoanInformationProps) => {
  return (
    <div className="d-flex">
      <ul>
        <li>
          <b>Id:</b> #{loan.id}
        </li>
        <li>
          <b>Approved amount</b>: {loan.approvedAmount}
        </li>
        <li>
          <b>Disbursed amount</b>: {loan.disbursedAmount}
        </li>
        <li>
          <b>Principal balance</b>: {loan.principalBalance}
        </li>
        <li>
          <b>Accrued interest</b>: {loan.accruedInterest}
        </li>
        <li>
          <b>Annual interest rate</b>: {loan.annualInterestRate}
        </li>
        <li>
          <b>Number of payments</b>: {loan.numberOfPayments}
        </li>
      </ul>
      <ul>
        <li>
          <b>Payment frecuency</b>: {loan.paymentFrecuency}
        </li>
        <li>
          <b>Payment value</b>: {loan.paymentValue}
        </li>
        <li>
          <b>Start date</b>: {loan.startDate}
        </li>
        <li>
          <b>Next payment date</b>: {loan.nextPaymentDate}
        </li>
        <li>
          <b>Delivery date</b>: {loan.deliveryDate}
        </li>
        <li>
          <b>Status</b>: {loan.status}
        </li>
      </ul>
    </div>
  );
};

export default LoanInformation;
