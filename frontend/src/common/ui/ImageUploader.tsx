import { useState } from "react";

interface ImageUploaderProps {
  defaultImageSrc?: string;
  uploadUrl: string;
}

/**
 * ImageUploader component allows users to upload an image.
 * @param {ImageUploaderProps} props - Props containing the default image source and upload URL.
 * @returns {JSX.Element} - A JSX element representing the ImageUploader.
 */
const ImageUploader = ({ defaultImageSrc }: ImageUploaderProps) => {
  const [, setFile] = useState<File | null>(null);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target?.files?.[0];
    if (uploadedFile) setFile(uploadedFile);
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
