import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DocumentIcon from "../DocumentIcon";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { ColumnDef } from "@tanstack/react-table";
import { ApiFile } from "../../models/apiFile";
import { toFormattedDate } from "../../utils/utils";
import DataTable from "../DataTable/DataTable";
import { useState } from "react";
import LightBox from "../LightBox";

interface FileExplorerProps {
  showLink?: boolean;
  extraColumns?: ColumnDef<ApiFile>[];
  navigateCallBack?: (page: number) => void;
  files: ApiFile[];
}

const FileExplorer = ({
  files = [],
  showLink = false,
  extraColumns = [],
}: FileExplorerProps) => {
  const [page, setPage] = useState(0);
  const [lightBoxFiles, setLightBoxFiles] = useState<ApiFile[]>([]);
  const [showlightBox, setShowLightBox] = useState(false);

  const columns: ColumnDef<ApiFile>[] = [
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
          {showLink && (
            <a
              className="text-decoration-none text-dark"
              href={row.original.url}
              target="_blank"
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          )}
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
      cell: ({ row }) =>
        row.original.lastModified
          ? "---"
          : toFormattedDate(new Date(row.original.lastModified)),
    },
    {
      accessorKey: "createdAt",
      header: "Creado",
      enableSorting: true,
      cell: ({ row }) =>
        row.original.lastModified
          ? "---"
          : toFormattedDate(new Date(row.original.lastModified)),
    },
    ...extraColumns,
  ];

  const onRowClick = (file: ApiFile) => {
    setShowLightBox(true);
    setLightBoxFiles([file]);
  };

  return (
    <>
      <DataTable<ApiFile>
        className="documents-table"
        columns={columns}
        data={files.slice(1 * page, 10 * (page + 1))}
        navigateCallback={(page: number) => setPage(page)}
        onRowClick={onRowClick}
      />
      <LightBox
        files={lightBoxFiles}
        show={showlightBox}
        onHide={() => setShowLightBox(false)}
      />
    </>
  );
};

export default FileExplorer;
