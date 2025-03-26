import InfoTable from "../../../common/InfoTable";
import { Loan } from "../../../models/loan";
import { getFullName, toCurrency } from "../../../utils/utils";

interface LoanInformationProps {
  loan: Loan;
}

const LoanInformation = ({ loan }: LoanInformationProps) => {
  return (
    <>
      <InfoTable
        data={[
          ["Id", loan.id?.toString(), "Client", getFullName(loan.client)],
          [
            "Approved Amount",
            toCurrency(loan.approvedAmount),
            "Disbursed Amount",
            toCurrency(loan.disbursedAmount),
          ],
          [
            "Interest Rate",
            loan.annualInterestRate?.toString(),
            "Payment Frecuency",
            loan.paymentFrecuency?.toString(),
          ],
          [
            "Principal",
            toCurrency(loan.principalBalance),
            "Interests",
            toCurrency(loan.accruedInterest),
          ],
          [
            "Loan Officer",
            getFullName(loan.loanOfficer),
            "Status",
            loan.status,
          ],
          [
            "# Payments",
            loan.numberOfPayments?.toString(),
            "Payment Value",
            loan.paymentValue?.toString(),
          ],
          [
            "Start Date",
            loan.startDate?.toString(),
            "Delivery",
            loan.deliveryDate?.toString(),
          ],
          [
            "Last Payment",
            loan.lastPaymentDate?.toString(),
            "Next Payment",
            loan.nextPaymentDate?.toString(),
          ],
        ]}
      />
    </>
  );
};

export default LoanInformation;
