import { Collateral } from "../../../models/collateral";
import FileExplorer from "../../../common/ui/FileExplorer";
import DeleteCollateralFileBtn from "./DeleteCollateralFileBtn";
import NewCollateralFileBtn from "./NewCollateralFileBtn";

interface CollateralFilesExplorer {
  collateral: Collateral;
}

const CollateralFilesExplorer = ({ collateral }: CollateralFilesExplorer) => {
  return (
    <>
      <div className="flex justify-end mb-3">
        <NewCollateralFileBtn collateralId={collateral.id} />
      </div>
      <FileExplorer
        files={collateral.files}
        extraColumns={[
          {
            header: "options",
            cell: ({ row }) => (
              <DeleteCollateralFileBtn
                collateral={collateral}
                file={row.original}
              />
            ),
          },
        ]}
        showLink={true}
      />
    </>
  );
};

export default CollateralFilesExplorer;
