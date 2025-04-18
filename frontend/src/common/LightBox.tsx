import { Carousel } from "react-bootstrap";
import { ApiFile } from "../models/apiFile";

interface LightBoxInterface {
  files: ApiFile[];
  show: boolean;
  onHide: () => void;
}

const LightBox = ({ files, onHide, show }: LightBoxInterface) => {
  const handleOnHide = (event: React.MouseEvent) => {
    event.stopPropagation();
    onHide();
  };

  if (!show) return;

  return (
    <div className="modal-overlay" onClick={handleOnHide}>
      <Carousel
        indicators={files.length > 1}
        onClick={(e) => e.stopPropagation()}
      >
        {files.map((file, key) => (
          <div
            key={key}
            className="p-lg-5"
            onClick={(e) => e.stopPropagation()}
          >
            <img key={key} className="h-full" src={file.url} alt={file.url} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LightBox;
