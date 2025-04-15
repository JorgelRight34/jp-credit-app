import React, { useState } from "react";
import Modal from "./Modal";

const MultipleFilesInput = () => {
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleOnFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const uploadedFile = event.target?.files?.[0];
    if (!uploadedFile) return;

    if (index) {
      setFiles((prev) => [...prev].splice(index, 0, uploadedFile));
    } else {
      setFiles((prev) => [...prev, uploadedFile]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => [...prev].splice(index, 0));
  };

  return (
    <>
      <input
        type="file"
        className="form-control"
        onChange={handleOnFileChange}
        multiple
      />
      <button onClick={() => setShowModal(true)}>Archivos</button>
      <Modal title="Fotos" show={showModal} onHide={() => setShowModal(false)}>
        <div className="space-y-3">
          {files.map((file, index) => (
            <label key={file.name} className="relative block">
              <span
                className="material-symbols-outlined absolute right-0 top-0 cursor-pointer hover:bg-gray-100 p-1 rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  removeFile(index);
                }}
              >
                close
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
      </Modal>
    </>
  );
};

export default MultipleFilesInput;
