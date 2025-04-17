import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

interface TabTitleProps {
  title: string;
  path: string;
}

const TabTitle = ({ title, path }: TabTitleProps) => {
  return (
    <div className="flex align-center">
      <span className="me-2">{title}</span>
      <Link className="link-reset" to={path} style={{ color: undefined }}>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </Link>
    </div>
  );
};

export default TabTitle;
