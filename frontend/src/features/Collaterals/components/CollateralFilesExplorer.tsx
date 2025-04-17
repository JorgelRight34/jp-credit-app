import { Collateral } from "../../../models/collateral";
import { toFormattedDate } from "../../../utils/utils";
import DataTable from "../../../common/DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { CollateralFile } from "../../../models/collateralFile";
import DocumentIcon from "../../../common/DocumentIcon";
import NewCollateralFileBtn from "./NewCollateralFileBtn";
import DeleteCollateralFileBtn from "./DeleteCollateralFileBtn";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

interface CollateralFilesExplorer {
  collateral: Collateral;
}

const CollateralFilesExplorer = ({ collateral }: CollateralFilesExplorer) => {
  const [page, setPage] = useState(0);
  const columns = useMemo<ColumnDef<CollateralFile>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nombre",
        enableSorting: true,
        cell: ({ row }) => (
          <div className="d-flex align-items-center">
            <DocumentIcon type={row.original.fileType?.replace(".", "")} />
            <span className="ms-2 me-3">
              {row.original.name} {row.original.fileType?.replace(".", "")}
            </span>
            <a
              className="text-decoration-none text-dark"
              href={row.original.url}
              target="_blank"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </div>
        ),
      },
      {
        accessorKey: "fileType",
        header: "Tipo",
        enableSorting: true,
      },
      {
        accessorKey: "lastModified",
        header: "Modificado",
        enableSorting: true,
        cell: ({ row }) => toFormattedDate(new Date(row.original.lastModified)),
      },
      {
        accessorKey: "createdAt",
        header: "Creado",
        enableSorting: true,
        cell: ({ row }) => toFormattedDate(new Date(row.original.createdAt)),
      },
      {
        header: "Opciones",
        cell: ({ row }) => (
          <DeleteCollateralFileBtn
            collateral={collateral}
            file={row.original}
          ></DeleteCollateralFileBtn>
        ),
      },
    ],
    [collateral]
  );

  const data = useMemo(
    () => collateral.files.slice(1 * page, 10 * (page + 1)),
    [collateral.files, page]
  );

  return (
    <>
      <div className="flex justify-end mb-3">
        <NewCollateralFileBtn collateralId={collateral.id} />
      </div>
      <DataTable<CollateralFile>
        className="documents-table"
        columns={columns}
        data={data}
        navigateCallback={(page: number) => setPage(page)}
      />
    </>
  );
};

export default CollateralFilesExplorer;
