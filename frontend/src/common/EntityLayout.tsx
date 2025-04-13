import { ReactNode, useEffect } from "react";

interface EntityLayoutProps {
  children: ReactNode;
  title: string;
  onAddNew?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
}

/**
 * A layout component that wraps its children with a title and action buttons.
 * It is used to provide a consistent layout structure for different entities.
 * @component
 * @param {EntityLayoutProps} props - The props for the entity layout component.
 * @param {ReactNode} props.children - The content to be displayed inside the layout.
 * @param {string} props.title - The title of the entity layout.
 * @param {function} [props.onAddNew] - A function to be called when the "Add new" button is clicked.
 * @param {function} [props.onEdit] - A function to be called when the "Edit" button is clicked.
 * @param {function} [props.onDelete] - A function to be called when the "Delete" button is clicked.
 * @param {function} [props.onDownload] - A function to be called when the "Download" button is clicked.
 * @returns {JSX.Element} The rendered entity layout component.
 */
const EntityLayout = ({
  children,
  title,
  onAddNew,
  onEdit,
  onDelete,
  onDownload,
}: EntityLayoutProps) => {
  useEffect(() => {
    document.title = title;
  });

  return (
    <>
      <div className="p-lg-5">
        <div className="bg-white rounded-3 shadow-sm p-3">
          <div className="d-flex align-items-center border-bottom pb-3 px-3">
            <h3 className="mb-0">{title}</h3>
            {onAddNew && (
              <button
                className="btn btn-accent shadow-sm ms-auto"
                onClick={onAddNew}
              >
                Añadir nuevo +
              </button>
            )}
            {onEdit && (
              <button
                className="btn btn-accent shadow-sm ms-auto"
                onClick={onEdit}
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                className="btn btn-accent shadow-sm ms-auto"
                onClick={onDelete}
              >
                Eliminar
              </button>
            )}
            {onDownload && (
              <button
                className="btn btn-accent shadow-sm ms-auto"
                onClick={onDownload}
              >
                Descargar
              </button>
            )}
          </div>
          <div className="entity-layout p-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default EntityLayout;
