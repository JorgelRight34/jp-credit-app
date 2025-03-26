import { useNavigate } from "react-router";
import { Collateral } from "../../../models/collateral";

interface CollateralDataRow {
  collateral: Collateral;
}

const CollateralDataRow = ({ collateral }: CollateralDataRow) => {
  const navigate = useNavigate();

  return (
    <tr onClick={() => navigate(`/collaterals/${collateral.id}`)}>
      <td>{collateral.id}</td>
      <td>{collateral.title}</td>
      <td>{collateral.value}</td>
      <td>
        {collateral.client.firstName} {collateral.client.lastName}
      </td>
    </tr>
  );
};

export default CollateralDataRow;
