import DataTable from "../../../common/DataTable";
import { ArmotizationPayment } from "../../../models/armotizationPayment";
import ArmotizationPaymentDataRow from "./ArmotizationPaymentDataRow";

interface ArmotizationDataTableProps {
  armotization: ArmotizationPayment[];
}

const ArmotizationDataTable = ({
  armotization,
}: ArmotizationDataTableProps) => {
  const headers = ["#", "Interest", "Capital", "Principal"];

  return (
    <DataTable headers={headers}>
      {armotization.map((payment, key) => (
        <ArmotizationPaymentDataRow key={key} payment={payment} />
      ))}
    </DataTable>
  );
};

export default ArmotizationDataTable;
