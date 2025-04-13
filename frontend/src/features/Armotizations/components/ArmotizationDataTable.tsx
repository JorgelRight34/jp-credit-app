import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable";
import { ArmotizationPayment } from "../../../models/armotizationPayment";
import { toCurrency } from "../../../utils/utils";

interface ArmotizationDataTableProps {
  armotization: ArmotizationPayment[];
}

/**
 * ArmotizationDataTable component displays a table of armotization payments.
 * It uses the DataTable component to render the data in a tabular format.
 *
 * @param {ArmotizationDataTableProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const ArmotizationDataTable = ({
  armotization,
}: ArmotizationDataTableProps) => {
  const columns: ColumnDef<ArmotizationPayment>[] = [
    { accessorKey: "id", header: "#" },
    {
      header: "Interest",
      cell: ({ row }) => toCurrency(row.original.interestValue),
    },
    {
      header: "Capital",
      cell: ({ row }) => toCurrency(row.original.capitalValue),
    },
    {
      header: "Principal",
      cell: ({ row }) => toCurrency(row.original.principalBalance),
    },
  ];

  return <DataTable columns={columns} data={armotization} />;
};

export default ArmotizationDataTable;
