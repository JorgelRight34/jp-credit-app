import InfoTable from "../../../common/DataTable/InfoTable";
import LinkToProfile from "../../Profiles/components/LinkToProfile";
import { Loan } from "../../../models/loan";
import { loanStatusSpanishTranslations } from "../../../utils/constants";
import { toCurrency } from "../../../utils/utils";

interface LoanInfoTableProps {
  loan: Loan;
}

const LoanInfoTable = ({ loan }: LoanInfoTableProps) => {
  return (
    <InfoTable
      data={[
        [
          "Id",
          loan.id?.toString(),
          "Cliente",
          <LinkToProfile profile={loan.client} />,
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
          loan.loanOfficer ? (
            <LinkToProfile profile={loan.loanOfficer} />
          ) : (
            "---"
          ),
          "Estado",
          loanStatusSpanishTranslations[loan.status],
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
          loan.lastPaymentDate === "0001-01-01" ? "---" : loan.lastPaymentDate,
          "Siguiente Pago",
          loan.nextPaymentDate,
        ],
      ]}
    />
  );
};

export default LoanInfoTable;
