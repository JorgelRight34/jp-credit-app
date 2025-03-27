import InfoTable from "../../../common/InfoTable";
import { Loan } from "../../../models/loan";
import { getFullName, toCurrency } from "../../../utils/utils";

interface LoanInformationProps {
  loan: Loan;
}

const LoanInformation = ({ loan }: LoanInformationProps) => {
  return (
    <div className="row mx-0">
      <div>
        <h4>Description</h4>
        <p>
          {loan.description
            ? loan.description
            : "No description provided for this loan."}
        </p>
      </div>
      <div>
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
              (loan.annualInterestRate * 100)?.toString() + "%",
              "Payment Frequency",
              loan.paymentFrequency?.toString(),
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
              toCurrency(loan.paymentValue),
            ],
            [
              "Start Date",
              loan.startDate?.toString(),
              "Delivery",
              loan.deliveryDate?.toString(),
            ],
            [
              "Last Payment",
              loan.lastPaymentDate === "0001-01-01"
                ? "---"
                : loan.lastPaymentDate,
              "Next Payment",
              loan.nextPaymentDate,
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default LoanInformation;
