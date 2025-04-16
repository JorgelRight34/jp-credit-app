import InfoTable from "../../../common/DataTable/InfoTable";
import { Collateral } from "../../../models/collateral";
import { collateralAgreementTypeSpanishTranslations } from "../../../utils/constants";
import { toCurrency, toFormattedDate, toTitleCase } from "../../../utils/utils";

interface CollateralCriticalInfoProps {
  collateral: Collateral;
}

const CollateralCriticalInfo = ({
  collateral,
}: CollateralCriticalInfoProps) => {
  return (
    <InfoTable
      data={[
        [
          "Tipo de Garantía",
          toTitleCase(
            collateralAgreementTypeSpanishTranslations[collateral.agreementType]
          ),
          "Expiración",
          collateral.expirationDate
            ? toFormattedDate(new Date(collateral.expirationDate))
            : "---",
        ],
        ["Valor Estimado", toCurrency(collateral.value), "", ""],
        [
          "Ubicación",
          collateral.location ? toTitleCase(collateral.location) : "No aplica.",
          "",
          "",
        ],
      ]}
    />
  );
};

export default CollateralCriticalInfo;
