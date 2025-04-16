import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileAlt,
  FaFileImage,
  FaFileArchive,
} from "react-icons/fa";

interface DocumentIconProps {
  type: string;
  size?: number;
  color?: string;
  className?: string;
}

const DocumentIcon = ({
  type,
  size = 24,
  className,
  color = "#555",
}: DocumentIconProps) => {
  const icons = {
    pdf: <FaFilePdf className={className} size={size} color="#e74c3c" />,
    docx: <FaFileWord className={className} size={size} color="#2b579a" />,
    xlsx: <FaFileExcel className={className} size={size} color="#217346" />,
    txt: <FaFileAlt className={className} size={size} color={color} />,
    png: <FaFileImage className={className} size={size} color="#3498db" />,
    jpg: <FaFileImage className={className} size={size} color="#3498db" />,
    zip: <FaFileArchive className={className} size={size} color="#9b59b6" />,
  };

  return (
    icons[type as keyof typeof icons] || <FaFileAlt size={size} color={color} />
  ); // Default for unknown types
};

export default DocumentIcon;
