import { ReactNode } from "react";

interface EntityFormLayoutProps {
  children: ReactNode;
  allowDelete?: boolean;
  onDelete?: () => void;
  onSubmit: () => void;
}

/**
 * A layout component for entity forms that wraps its children with a form element.
 * It provides a submit button and an optional delete button.
 * @component
 * @param {EntityFormLayoutProps} props - The props for the entity form layout component.
 * @param {ReactNode} props.children - The content to be displayed inside the layout.
 * @param {boolean} [props.allowDelete] - A boolean indicating whether the delete button should be shown.
 * @param {function} [props.onDelete] - A function to be called when the delete button is clicked.
 * @param {function} props.onSubmit - A function to be called when the form is submitted.
 * @returns {JSX.Element} The rendered entity form layout component.
 */
const EntityFormLayout = ({
  children,
  allowDelete,
  onDelete,
  onSubmit,
}: EntityFormLayoutProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="row mx-0 pt-3">{children}</div>
      <div className="d-flex">
        <button type="submit" className="btn btn-accent w-100">
          Ok
        </button>
        {allowDelete && (
          <button
            type="button"
            className="btn btn-accent-secondary w-100 ms-3"
            onClick={onDelete}
          >
            Eliminar
          </button>
        )}
      </div>
    </form>
  );
};

export default EntityFormLayout;
