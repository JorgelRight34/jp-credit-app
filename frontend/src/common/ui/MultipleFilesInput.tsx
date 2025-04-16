import React, { useState } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import AccentBtn from "./AccentBtn";
import FileInputPreview from "./FileInputPreview";

interface MultipleFilesInputProps {
  setFiles: (files: File[] | ((prev: File[]) => File[])) => void;
  defaultFileSources?: string[];
  setDefaultFileSources?: (
    files: string[] | ((prev: string[]) => string[])
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

  const handleOnFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const uploadedFile = event.target?.files?.[0];
    event.target.value = "";
    if (!uploadedFile) return;

    if (files.length === maxLength) {
      setFiles((prev) => prev.splice(-1, 0, uploadedFile));
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
        Subir Archivo
      </AccentBtn>

      <Modal
        title="Archivos"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <div className="p-3">
          <label>
            <input
              type="file"
              className="d-none"
              onChange={handleOnFileChange}
            />
            <span className="btn btn-accent">
              <FontAwesomeIcon className="me-2" icon={faUpload} />
              Subir Archivo
            </span>
          </label>
          <div className="space-y-3 flex items-center gap-3 min-h-100 max-h-100 min-w-250 max-w-250">
            {defaultFileSources.map((src, index) => (
              <FileInputPreview
                key={index}
                className="relative block w-25 h-50"
                fileName={src}
                src={src}
                onChange={(event) => handleOnFileChange(event, index)}
                onRemove={() => removeDefaultFile(index)}
              />
            ))}
            {files.map((file, index) => (
              <FileInputPreview
                key={index}
                className="relative block w-25 h-50"
                fileName={file.name}
                src={URL.createObjectURL(file)}
                onChange={(event) => handleOnFileChange(event, index)}
                onRemove={() => removeFile(index)}
              />
            ))}
          </div>
          <div>
            <AccentBtn
              onClick={() => {
                setShowModal(false);
                onConfirm && onConfirm();
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
