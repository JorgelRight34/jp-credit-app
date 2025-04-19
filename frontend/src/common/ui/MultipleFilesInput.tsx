import { useEffect, useState } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import AccentBtn from "./AccentBtn";
import FileExplorer from "./FileExplorer";
import { ApiFile } from "../../models/apiFile";
import { ColumnDef } from "@tanstack/react-table";
import useMultipleFilesInput from "../../hooks/useMultipleFilesInput";

interface MultipleFilesInputProps {
  setFiles: (files: File[] | ((prev: File[]) => File[])) => void;
  defaultFileSources?: ApiFile[];
  setDefaultFileSources?: (
    files: ApiFile[] | ((prev: ApiFile[]) => ApiFile[])
  ) => void;
  maxLength: number;
  className?: string;
  onConfirm?: () => void;
}

const MultipleFilesInput = ({
  maxLength,
  className = "",
  defaultFileSources = [],
  setDefaultFileSources,
  onConfirm,
  setFiles,
}: MultipleFilesInputProps) => {
  const [showModal, setShowModal] = useState(false);
  const {
    tableFiles,
    handleOnFileChange,
    removeFile,
    removeDefaultFile,
    files: hookFiles,
  } = useMultipleFilesInput(
    defaultFileSources,
    setDefaultFileSources,
    maxLength
  );

  const extraColumns: ColumnDef<ApiFile>[] = [
    {
      header: "Opciones",
      cell: ({ row }) => (
        <AccentBtn
          onClick={(event) => {
            event.stopPropagation();
            if (!row.original.publicId) removeFile(row.index);
            else removeDefaultFile(row.index);
          }}
        >
          Borrar
        </AccentBtn>
      ),
    },
  ];

  useEffect(() => {
    console.log("changing now", hookFiles);
    setFiles(hookFiles);
  }, [hookFiles]);

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
