import { ReactNode, useEffect } from "react";
import AccentBtn from "../common/ui/AccentBtn";

interface EntityLayoutProps {
  children: ReactNode;
  extraOption?: ReactNode;
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
  extraOption,
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
      <div className="px-lg-5">
        <div className="bg-white entity-layout rounded-3 shadow-sm p-3">
          <div className="d-flex align-items-center border-bottom pb-3 px-3">
            <h3 className="mb-0 border-left-accent ps-2">{title}</h3>
            <div className="ms-auto">
              {extraOption && extraOption}
              {onAddNew && (
                <AccentBtn className="ms-3" onClick={onAddNew}>
                  Añadir Nuevo +
                </AccentBtn>
              )}
              {onEdit && (
                <AccentBtn className="ms-3" onClick={onEdit}>
                  Editar
                </AccentBtn>
              )}
              {onDelete && (
                <AccentBtn className="ms-3" onClick={onDelete}>
                  Eliminar
                </AccentBtn>
              )}
              {onDownload && (
                <AccentBtn className="ms-3" onClick={onDownload}>
                  Descargar
                </AccentBtn>
              )}
            </div>
          </div>
          <div className="entity-layout-children p-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default EntityLayout;
