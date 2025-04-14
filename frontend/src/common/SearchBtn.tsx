import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React from "react";

type SearchBtnProps = {
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * SearchBtn component renders a styled search button with a magnifying glass icon and "Buscar" label.
 *
 * This button can be reused across the application to trigger a search action.
 * It supports additional custom styling through the `className` prop.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.className] - Optional additional CSS classes to apply to the button.
 *
 * @returns {JSX.Element} A styled search button with an icon.
 *
 * @example
 * <SearchBtn onClick={handleSearch} className="my-custom-class" />
 */
const SearchBtn = ({ className = "", ...props }: SearchBtnProps) => {
  return (
    <button className={`btn btn-accent px-3 ${className}`} {...props}>
      <div className="d-flex align-items-center">
        <FontAwesomeIcon className="me-2" icon={faMagnifyingGlass} />
        Buscar
      </div>
    </button>
  );
};
export default SearchBtn;
