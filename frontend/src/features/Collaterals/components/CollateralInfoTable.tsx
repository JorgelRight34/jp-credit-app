import { Link } from "react-router";
import InfoTable from "../../../common/DataTable/InfoTable";
import {
  getFullName,
  toFormattedDate,
  toTitleCase,
} from "../../../utils/utils";
import { Collateral } from "../../../models/collateral";
import {
  collateralConditionSpanishTranslations,
  collateralStatusSpanishTranslations,
} from "../../../utils/constants";

interface CollateralInfoTableProps {
  collateral: Collateral;
}

const CollateralInfoTable = ({ collateral }: CollateralInfoTableProps) => {
  return (
    <InfoTable
      data={[
        ["Id", collateral.id],
        ["Título", collateral.title],
        [
          "Cliente",
          <Link
            className="text-accent-secondary"
            to={`/profiles/${collateral.client.username}`}
          >
            {getFullName(collateral.client)}
          </Link>,
        ],
        [
          "Préstamo",
          <Link
            className="text-accent-secondary"
            to={`/loans/${collateral.loanId}`}
          >
            {collateral.loanId}
          </Link>,
        ],
        [
          "Estado",
          toTitleCase(collateralStatusSpanishTranslations[collateral.status]),
        ],
        [
          "Condición",
          toTitleCase(
            collateralConditionSpanishTranslations[collateral.condition]
          ),
        ],
        ["Fecha", toFormattedDate(new Date(collateral.createdAt))],
      ]}
    />
  );
};

export default CollateralInfoTable;
