import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable/DataTable";
import { Collateral } from "../../../models/collateral";
import { useNavigate } from "react-router";
import { toCurrency } from "../../../utils/utils";
import LinkToProfile from "../../Profiles/components/LinkToProfile";

interface CollateralsDataTableProps {
  collaterals: Collateral[];
  navigateCallback?: (
    page: number
  ) => void | Promise<Collateral[]> | Promise<void>;
}

const columns: ColumnDef<Collateral>[] = [
  { accessorKey: "id", header: "Id", enableSorting: true },
  { accessorKey: "title", header: "Título", enableSorting: true },
  {
    header: "Valor",
    accessorKey: "value",
    enableSorting: true,
    cell: ({ row }) => toCurrency(row.original.value),
  },
  {
    accessorKey: "clientId",
    header: "Cliente",
    enableSorting: true,
    cell: ({ row }) => (
      <LinkToProfile
        profile={row.original.owner}
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
      />
    ),
  },
];

/**
 * CollateralsDataTable component displays a table of collaterals.
 * It uses the DataTable component to render the data in a tabular format.
 *
 * @param {CollateralsDataTableProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const CollateralsDataTable = ({
  collaterals,
  navigateCallback,
}: CollateralsDataTableProps) => {
  const navigate = useNavigate();

  return (
    <DataTable<Collateral>
      columns={columns}
      data={collaterals}
      onRowClick={(collateral: Collateral) =>
        navigate(`/collaterals/${collateral.id}`)
      }
      navigateCallback={navigateCallback || (() => {})}
    />
  );
};

export default CollateralsDataTable;
