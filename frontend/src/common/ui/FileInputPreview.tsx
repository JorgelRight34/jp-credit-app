import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FileInputPreviewProps {
  src: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (event: React.MouseEvent) => void;
  fileName: string;
}

const FileInputPreview = ({
  src,
  className = "",
  fileName,
  onChange,
  onRemove,
}: FileInputPreviewProps) => {
  return (
    <label key={fileName} className={className}>
      <span
        className="material-symbols-outlined absolute right-0 top-0 cursor-pointer hover:bg-gray-100 p-1 rounded-full"
        onClick={onRemove}
      >
        <FontAwesomeIcon size={"lg"} icon={faCircleXmark} />
      </span>

      <input type="file" className="hidden" onChange={onChange} />

      <img
        className="w-full rounded-lg mb-3 object-cover"
        src={src}
        alt={`Preview ${fileName}`}
      />
    </label>
  );
};

export default FileInputPreview;
