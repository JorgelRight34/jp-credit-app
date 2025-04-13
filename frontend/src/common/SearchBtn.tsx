import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchBtnProps {
  onClick: () => void;
  className?: string;
}

/**
 * SearchBtn component renders a styled search button with a magnifying glass icon and "Buscar" label.
 *
 * This button can be reused across the application to trigger a search action.
 * It supports additional custom styling through the `className` prop.
 *
 * @param {Object} props - Component props.
 * @param {() => void} props.onClick - Function to execute when the button is clicked.
 * @param {string} [props.className] - Optional additional CSS classes to apply to the button.
 *
 * @returns {JSX.Element} A styled search button with an icon.
 *
 * @example
 * <SearchBtn onClick={handleSearch} className="my-custom-class" />
 */
const SearchBtn = ({ onClick, className = "" }: SearchBtnProps) => {
  return (
    <button className={`btn btn-accent px-3 ${className}`} onClick={onClick}>
      <div className="d-flex align-items-center">
        <FontAwesomeIcon className="me-2" icon={faMagnifyingGlass} />
        Buscar
      </div>
    </button>
  );
};
export default SearchBtn;
