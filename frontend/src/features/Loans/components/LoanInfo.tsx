import { NavLink } from "react-router";
import InfoTable from "../../../common/DataTable/InfoTable";
import { Loan } from "../../../models/loan";
import {
  getFirstAndLastName,
  getFullName,
  toCurrency,
} from "../../../utils/utils";

interface LoanInfoProps {
  loan: Loan;
}

/**
 * Displays loan details in a structured layout with description and info table.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Loan} props.loan - Loan data object
 * @returns {React.ReactElement} Loan information display component
 *
 * @example
 * <LoanInfo loan={loanData} />
 */
const LoanInfo = ({ loan }: LoanInfoProps) => {
  return (
    <div className="row mx-0">
      <div className="mb-3">
        <h4>Descripción</h4>
        <p>
          {loan.description
            ? loan.description
            : "No description provided for this loan."}
        </p>
      </div>
      <div>
        <InfoTable
          data={[
            [
              "Id",
              loan.id?.toString(),
              "Cliente",
              <NavLink to={`/profiles/${loan.client?.username}`}>
                {getFirstAndLastName(loan.client)}
              </NavLink>,
            ],
            [
              "Monto Aprobado",
              toCurrency(loan.approvedAmount),
              "Desembolsado",
              toCurrency(loan.disbursedAmount),
            ],
            [
              "Tasa de Interés",
              (loan.annualInterestRate * 100)?.toString() + "%",
              "Frecuencia de Pago",
              loan.paymentFrequency?.toString(),
            ],
            [
              "Balance",
              toCurrency(loan.principalBalance),
              "Intereses",
              toCurrency(loan.accruedInterest),
            ],
            [
              "Agente",
              <NavLink to={`/profiles/${loan.loanOfficer?.username}`}>
                {getFullName(loan.loanOfficer)}
              </NavLink>,
              "Estado",
              loan.status,
            ],
            [
              "N. Pagos",
              loan.numberOfPayments?.toString(),
              "Cuota",
              toCurrency(loan.paymentValue),
            ],
            [
              "Fecha de Inicio",
              loan.startDate?.toString(),
              "Entrega",
              loan.deliveryDate?.toString(),
            ],
            [
              "Último Pago",
              loan.lastPaymentDate === "0001-01-01"
                ? "---"
                : loan.lastPaymentDate,
              "Siguiente Pago",
              loan.nextPaymentDate,
            ],
          ]}
        />
      </div>
    </div>
  );
};

export default LoanInfo;
