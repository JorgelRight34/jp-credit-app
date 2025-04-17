import InfoTable from "../../../common/DataTable/InfoTable";
import { Collateral } from "../../../models/collateral";
import { collateralAgreementTypeSpanishTranslations } from "../../../utils/constants";
import { toCurrency, toFormattedDate, toTitleCase } from "../../../utils/utils";
import CollateralCard from "./CollateralCard";
import CollateralCriticalInfo from "./CollateralCriticalInfo";
import CollateralInfoTable from "./CollateralInfoTable";

interface CollateralInfoProps {
  collateral: Collateral;
}

const CollateralInfo = ({ collateral }: CollateralInfoProps) => {
  return (
    <>
      <div className="row mx-0 mb-5">
        <div className="col-lg-7 d-flex align-items-center">
          <CollateralCard collateral={collateral} />
        </div>
        <div className="col-lg-5 d-flex align-items-center">
          <CollateralInfoTable collateral={collateral} />
        </div>
      </div>
      <div className="row mx-0 mb-5">
        <CollateralCriticalInfo collateral={collateral} />
      </div>
      <div className="row mx-0">
        <div className="col-lg-6">
          <h4>Descripción</h4>
          <p>
            {collateral.description ||
              "Esta garantía no tiene una descripción disponible."}
          </p>
        </div>
      </div>
    </>
  );
};

export default CollateralInfo;
