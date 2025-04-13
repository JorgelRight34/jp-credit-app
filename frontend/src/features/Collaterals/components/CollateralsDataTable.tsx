import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../common/DataTable";
import { Collateral } from "../../../models/collateral";
import { useNavigate } from "react-router";

interface CollateralsDataTableProps {
  collaterals: Collateral[];
  navigateCallback?: (page: number) => void;
}

const CollateralsDataTable = ({ collaterals }: CollateralsDataTableProps) => {
  const columns: ColumnDef<Collateral>[] = [
    { accessorKey: "id", header: "Id" },
    { accessorKey: "title", header: "Title" },
    {
      header: "Value",
      cell: ({ row }) => row.original.value.toLocaleString("en-US"),
    },
    { accessorKey: "clientId", header: "Client Id" },
  ];
  const navigate = useNavigate();

  return (
    <DataTable
      columns={columns}
      data={collaterals}
      onRowClick={(collateral: Collateral) =>
        navigate(`/collaterals/${collateral.id}`)
      }
    />
  );
};

export default CollateralsDataTable;
