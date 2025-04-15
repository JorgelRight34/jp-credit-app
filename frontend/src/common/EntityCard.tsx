import { ReactNode } from "react";

interface EntityCardProps {
  header: string | ReactNode;
  photoUrl: string;
  footer?: string | ReactNode;
}

/**
 * EntityCard component displays a card with a header, photo, and footer.
 * @param {EntityCardProps} props - Props containing the header, photo URL, and footer to be displayed in the card.
 * @returns {JSX.Element} - A JSX element representing the EntityCard.
 */
const EntityCard = ({
  header,
  photoUrl = "/default-profile-pic.webp",
  footer,
}: EntityCardProps) => {
  return (
    <div className="border p-3 rounded-3 shadow-sm w-100 h-100">
      <div className="profile-info-header">
        <h3 className="text-center mb-3">{header}</h3>
      </div>
      <div className="profile-info-photo-container w-100">
        <img className="img-fluid w-100 rounded-3 mb-3" src={photoUrl} />
      </div>
      <div className="profile-info-contact">
        <span className="text-center text-wrap">{footer}</span>
      </div>
    </div>
  );
};

export default EntityCard;
