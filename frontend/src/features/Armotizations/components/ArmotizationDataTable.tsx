import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable/DataTable";
import { ArmotizationPayment } from "../../../models/armotizationPayment";
import { toCurrency, toTitleCase } from "../../../utils/utils";
import { getSpanishMonthYearAfterAddingDays } from "../../../utils/constants";

interface ArmotizationDataTableProps {
  armotization: ArmotizationPayment[];
  paymentFrequencyPerYear?: number;
  startDate?: Date;
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
  startDate,
  paymentFrequencyPerYear,
}: ArmotizationDataTableProps) => {
  const columns: ColumnDef<ArmotizationPayment>[] = [
    {
      accessorKey: "number",
      header: "#",
      cell: ({ row }) => {
        if (!startDate || !paymentFrequencyPerYear) return row.original.number;
        return toTitleCase(
          getSpanishMonthYearAfterAddingDays(
            startDate,
            (365 / paymentFrequencyPerYear) * row.original.number
          )
        ); // Format in Spanish
      },
    },
    {
      header: "Intereses",
      cell: ({ row }) => toCurrency(row.original.interestValue),
    },
    {
      header: "Capital",
      cell: ({ row }) => toCurrency(row.original.capitalValue),
    },
    {
      header: "Balance",
      cell: ({ row }) => toCurrency(row.original.principalBalance),
    },
  ];

  return <DataTable columns={columns} data={armotization} />;
};

export default ArmotizationDataTable;
