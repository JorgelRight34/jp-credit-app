import AccentBtn from "../ui/AccentBtn";
import { FormEventHandler, MouseEventHandler, ReactNode } from "react";

interface EntityFormLayoutProps {
  children: ReactNode;
  onSubmit: FormEventHandler | ((data: any) => Promise<void>);
  allowDelete?: boolean;
  onDelete?: MouseEventHandler;
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
  onSubmit,
  onDelete,
  allowDelete = false,
}: EntityFormLayoutProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}
    >
      {children}
      <div className="d-flex">
        <AccentBtn type="submit" className="w-100">
          Ok
        </AccentBtn>
        {allowDelete && (
          <AccentBtn type="button" className="w-100 ms-3" onClick={onDelete}>
            Eliminar
          </AccentBtn>
        )}
      </div>
    </form>
  );
};

export default EntityFormLayout;
