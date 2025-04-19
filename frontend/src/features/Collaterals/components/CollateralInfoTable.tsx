import { Link } from "react-router";
import InfoTable from "../../../common/DataTable/InfoTable";
import { toFormattedDate, toTitleCase } from "../../../utils/utils";
import { Collateral } from "../../../models/collateral";
import {
  collateralConditionSpanishTranslations,
  collateralStatusSpanishTranslations,
} from "../../../utils/constants";
import LinkToProfile from "../../Profiles/components/LinkToProfile";

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
          <LinkToProfile profile={collateral.owner} fullName={true} />,
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
        ["Fecha", toFormattedDate(collateral.createdAt)],
      ]}
    />
  );
};

export default CollateralInfoTable;
