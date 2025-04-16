import { useState } from "react";
import MultipleFilesInput from "../../../common/ui/MultipleFilesInput";
import { Collateral } from "../../../models/collateral";
import { toFormattedDate } from "../../../utils/utils";
import DataTable from "../../../common/DataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { CollateralFile } from "../../../models/collateralFile";
import DocumentIcon from "../../../common/DocumentIcon";
import useUploadFile from "../../../hooks/useUploadFile";
import { useQueryClient } from "@tanstack/react-query";

interface CollateralFilesExplorer {
  collateral: Collateral;
}

const columns: ColumnDef<CollateralFile>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="d-flex align-items-center">
        <DocumentIcon type={row.original.type} />
        <span className="ms-2">{row.original.name}Nombre</span>
      </div>
    ),
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
];

const CollateralFilesExplorer = ({ collateral }: CollateralFilesExplorer) => {
  const [files, setFiles] = useState<File[]>([]);
  const { uploadFile } = useUploadFile();
  const queryClient = useQueryClient();

  const handleOnConfirm = async () => {
    const response = await uploadFile(
      `/collaterals/${collateral.id}/files`,
      files,
      "files"
    );
    queryClient.setQueryData(["collateral", collateral.id], response);
  };

  return (
    <>
      <div className="flex justify-end mb-3">
        <MultipleFilesInput
          className=""
          onConfirm={handleOnConfirm}
          files={files}
          setFiles={setFiles}
          maxLength={10}
        />
      </div>
      <DataTable<CollateralFile>
        className="documents-table"
        columns={columns}
        data={collateral.files}
      />
    </>
  );
};

export default CollateralFilesExplorer;
