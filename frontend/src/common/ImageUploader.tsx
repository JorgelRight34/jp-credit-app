import { useState } from "react";

interface ImageUploaderProps {
  defaultImageSrc?: string;
  uploadUrl: string;
}

const ImageUploader = ({ defaultImageSrc }: ImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target?.files?.[0];
    if (uploadedFile) setFile(uploadedFile);
    console.log(file);
  };

  return (
    <>
      <label>
        <img
          src={defaultImageSrc || "drop-image-here.webp"}
          className="img-fluid hover"
        />
        <input type="file" className="d-none" onChange={handleOnChange} />
      </label>
    </>
  );
};

export default ImageUploader;
