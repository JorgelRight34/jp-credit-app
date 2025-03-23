import EntityLayout from "../../../common/EntityLayout";
import useCollaterals from "../hooks/useCollaterals";

const CollateralsPage = () => {
  const [collaterals] = useCollaterals();

  return (
    <EntityLayout>
      {collaterals.map((collateral, key) => (
        <li key={key}>{collateral.id}</li>
      ))}
    </EntityLayout>
  );
};

export default CollateralsPage;
