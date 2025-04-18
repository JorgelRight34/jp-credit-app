import { useState } from "react";
import LightBox from "./LightBox";
import { ApiFile } from "../models/apiFile";

interface ImageWithLightBoxProps {
  src?: string;
  alt?: string;
  className?: string;
  image?: ApiFile;
}

const ImageWithLightBox = ({
  src,
  alt,
  image,
  className = "",
}: ImageWithLightBoxProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <img
        className={className}
        src={src}
        alt={alt}
        onClick={() => setShowModal(true)}
      />
      <LightBox
        files={image ? [image] : [{ url: src || "" }]}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};

export default ImageWithLightBox;
