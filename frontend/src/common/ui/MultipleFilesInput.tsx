import React, { useState } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

interface MultipleFilesInputProps {
  setFiles: (files: File[] | ((prev: File[]) => File[])) => void;
  files: File[];
  maxLength: number;
}

const MultipleFilesInput = ({
  maxLength,
  files,
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
    setFiles((prev) => [...prev].filter((_, key) => key != index));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-accent w-100"
        onClick={() => setShowModal(true)}
      >
        <FontAwesomeIcon className="me-2" icon={faUpload} />
        Subir Archivo
      </button>

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
            {files.map((file, index) => (
              <label key={file.name} className="relative block w-25 h-50">
                <span
                  className="material-symbols-outlined absolute right-0 top-0 cursor-pointer hover:bg-gray-100 p-1 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFile(index);
                  }}
                >
                  <FontAwesomeIcon size={"lg"} icon={faCircleXmark} />
                </span>

                <input
                  type="file"
                  className="hidden"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleOnFileChange(event, index)
                  }
                />

                <img
                  className="w-full rounded-lg mb-3 object-cover"
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                />
              </label>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MultipleFilesInput;
