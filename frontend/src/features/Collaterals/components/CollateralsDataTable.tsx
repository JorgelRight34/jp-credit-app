import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable";
import { Collateral } from "../../../models/collateral";
import { NavLink, useNavigate } from "react-router";
import { getFirstAndLastName, toCurrency } from "../../../utils/utils";

interface CollateralsDataTableProps {
  collaterals: Collateral[];
  navigateCallback?: (page: number) => void | Promise<void>;
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
      <NavLink to={`/profiles/${row.original.clientId}`}>
        {getFirstAndLastName(row.original.client)}
      </NavLink>
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
