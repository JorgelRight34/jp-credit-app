import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import AccentBtn from "./AccentBtn";
import FileExplorer from "./FileExplorer";
import { ApiFile } from "../../models/apiFile";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "react-toastify";

interface MultipleFilesInputProps {
  setFiles: (files: File[] | ((prev: File[]) => File[])) => void;
  defaultFileSources?: ApiFile[];
  setDefaultFileSources?: (
    files: ApiFile[] | ((prev: ApiFile[]) => ApiFile[])
  ) => void;
  files: File[];
  maxLength: number;
  className?: string;
  onConfirm?: () => void;
}

const MultipleFilesInput = ({
  maxLength,
  files,
  className = "",
  defaultFileSources = [],
  setDefaultFileSources,
  onConfirm,
  setFiles,
}: MultipleFilesInputProps) => {
  const [showModal, setShowModal] = useState(false);
  const tableFiles = useMemo(
    () => [
      ...defaultFileSources,
      ...files.map((file) => ({
        publicId: "---",
        url: URL.createObjectURL(file),
        id: 1,
        name: file.name,
        createdAt: "",
        lastModified: "",
        fileType: file.type,
      })),
    ],
    [files, defaultFileSources]
  );

  const extraColumns: ColumnDef<ApiFile>[] = [
    {
      header: "Opciones",
      cell: ({ row }) => (
        <AccentBtn
          onClick={(event) => {
            event.stopPropagation();
            if (row.original.createdAt !== "---") removeDefaultFile(row.index);
            else removeFile(row.index);
          }}
        >
          Borrar
        </AccentBtn>
      ),
    },
  ];

  const handleOnFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const uploadedFile = event.target?.files?.[0];
    event.target.value = "";
    if (!uploadedFile) return;

    if (tableFiles.length >= maxLength) {
      toast.error(`Solo ${maxLength} archivos son permitidos.`);
      return;
    }

    if (index) {
      setFiles((prev) => [...prev].splice(index, 0, uploadedFile));
    } else {
      setFiles((prev) => [...prev, uploadedFile]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => [...prev].filter((_, key) => key !== index));
  };

  const removeDefaultFile = (index: number) => {
    if (!setDefaultFileSources) return;

    setDefaultFileSources((prev) =>
      [...prev].filter((_, key) => key !== index)
    );
  };

  return (
    <>
      <AccentBtn
        type="button"
        className={className}
        onClick={() => setShowModal(true)}
      >
        <FontAwesomeIcon className="me-2" icon={faUpload} />
        Subir Archivo{" "}
      </AccentBtn>

      <Modal
        title="Archivos"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <div className="p-3 mb-3 h-full">
          <label
            className={
              tableFiles.length >= maxLength
                ? "cursor-not-allowed opacity-50"
                : ""
            }
          >
            <input
              type="file"
              className="d-none"
              onChange={handleOnFileChange}
            />
            <span className={`btn btn-accent cursor-not-allowed`}>
              <FontAwesomeIcon className="me-2" icon={faUpload} />
              Subir Archivo {tableFiles.length}
            </span>
            {tableFiles.length >= maxLength && (
              <span className="ms-3">
                Límite de archivos alcanzado, elimine uno
              </span>
            )}
          </label>
          <div className="py-5 min-h-100 max-h-100 min-w-250 max-w-250">
            <div className="w-full h-full">
              <FileExplorer extraColumns={extraColumns} files={tableFiles} />
            </div>
          </div>
          <div>
            <AccentBtn
              onClick={() => {
                setShowModal(false);
                if (onConfirm) onConfirm();
              }}
              className="w-100"
            >
              Ok
            </AccentBtn>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MultipleFilesInput;
