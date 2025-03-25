import { Collateral } from "../../../models/collateral";

interface CollateralDataRow {
  collateral: Collateral;
}

const CollateralDataRow = ({ collateral }: CollateralDataRow) => {
  return (
    <tr>
      <td>{collateral.id}</td>
      <td>{collateral.title}</td>
      <td>{collateral.value}</td>
      <td>{collateral.clientId}</td>
    </tr>
  );
};

export default CollateralDataRow;
