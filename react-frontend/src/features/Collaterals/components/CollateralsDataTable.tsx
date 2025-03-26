import DataTable from "../../../common/DataTable";
import { Collateral } from "../../../models/collateral";
import CollateralDataRow from "./CollateralDataRow";

interface CollateralsDataTableProps {
  collaterals: Collateral[];
}

const CollateralsDataTable = ({ collaterals }: CollateralsDataTableProps) => {
  const headers = ["Id", "Title", "Value", "Client"];

  return (
    <DataTable headers={headers}>
      {collaterals.map((collateral, key) => (
        <CollateralDataRow key={key} collateral={collateral} />
      ))}
    </DataTable>
  );
};

export default CollateralsDataTable;
