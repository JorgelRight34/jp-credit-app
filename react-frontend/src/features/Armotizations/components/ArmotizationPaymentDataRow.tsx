import { ArmotizationPayment } from "../../../models/armotizationPayment";
import { toCurrency } from "../../../utils/utils";

interface ArmotizationPaymentDataRowProps {
  payment: ArmotizationPayment;
}

const ArmotizationPaymentDataRow = ({
  payment,
}: ArmotizationPaymentDataRowProps) => {
  return (
    <tr>
      <td>{payment.number}</td>
      <td>{toCurrency(payment.interestValue)}</td>
      <td>{toCurrency(payment.capitalValue)}</td>
      <td>{toCurrency(payment.principalBalance)}</td>
    </tr>
  );
};

export default ArmotizationPaymentDataRow;
