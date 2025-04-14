import { NavLink } from "react-router";
import InfoTable from "../../../common/InfoTable";
import { Collateral } from "../../../models/collateral";
import { getFullName, toTitleCase } from "../../../utils/utils";
import EntityCard from "../../../common/EntityCard";

interface CollateralInfoProps {
  collateral: Collateral;
}

const CollateralInfo = ({ collateral }: CollateralInfoProps) => {
  return (
    <div className="row mx-0">
      <div className="mb-3">
        <h4>Descripción</h4>
        <p>
          {collateral.description
            ? collateral.description
            : "No description provided for collateral."}
        </p>
      </div>
      <div className="row mx-0">
        <div className="col-lg-3 d-flex align-items-center">
          <EntityCard
            header={collateral.title}
            photoUrl={collateral.photo?.url || "/default-profile-pic.webp"}
            footer={collateral.client.username}
          />
        </div>
        <div className="col-lg-9">
          <InfoTable
            data={[
              ["Id", collateral.id, "Title", collateral.title],
              [
                "Cliente",
                <NavLink to={`/profiles/${collateral.client.username}`}>
                  {getFullName(collateral.client)}
                </NavLink>,
                "Id Cliente",
                collateral.clientId,
              ],
              [
                "Préstamo",
                <NavLink to={`/loans/${collateral.loanId}`}>
                  {collateral.loanId}
                </NavLink>,
                "",
                "",
              ],
              [
                "Estado",
                toTitleCase(collateral.condition),
                "Condición",
                toTitleCase(collateral.condition),
              ],
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default CollateralInfo;
