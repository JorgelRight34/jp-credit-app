import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collateral } from "../../../models/collateral";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getFirstAndLastName } from "../../../utils/utils";
import { Carousel } from "react-bootstrap";

interface CollateralCardProps {
  collateral: Collateral;
}

const CollateralCard = ({ collateral }: CollateralCardProps) => {
  return (
    <div className="border-accent-secondary rounded p-3 w-full shadow-sm">
      <h3 className="text-center mb-3">{collateral.title}</h3>
      <div className="w-full bg-dark mb-3">
        {collateral.photos.length > 1 ? (
          <Carousel interval={null}>
            {collateral.photos.map((photo) => (
              <Carousel.Item key={photo.id}>
                <img
                  className="w-full h-[300px] object-contain"
                  src={photo.url}
                  alt={`Foto de ${collateral.title} (garantía)`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <img
            className="rounded-lg shadow-sm w-full h-[300px] object-contain mb-3"
            src={collateral.photos[0].url || "/default-profile-pic.webp"}
          />
        )}
      </div>
      <div className="d-flex flex-column">
        <span className="mx-auto">
          <FontAwesomeIcon className="me-2" icon={faUser} />
          <span className="mb-0">{getFirstAndLastName(collateral.client)}</span>
        </span>
      </div>
    </div>
  );
};

export default CollateralCard;
