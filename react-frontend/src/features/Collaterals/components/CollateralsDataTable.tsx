import DataTable from "../../../common/DataTable";
import { Collateral } from "../../../models/collateral";
import CollateralDataRow from "./CollateralDataRow";

interface CollateralsDataTableProps {
  collaterals: Collateral[];
  navigateCallback?: (page: number) => void;
}

const CollateralsDataTable = ({
  collaterals,
  navigateCallback,
}: CollateralsDataTableProps) => {
  const headers = ["Id", "Title", "Value", "Client"];

  return (
    <DataTable headers={headers} callback={navigateCallback}>
      {collaterals.map((collateral, key) => (
        <CollateralDataRow key={key} collateral={collateral} />
      ))}
    </DataTable>
  );
};

export default CollateralsDataTable;
