import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet-async";

interface EntityLayoutProps {
  children: ReactNode;
  title: string;
  onAddNew?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
}

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
                Add new +
              </button>
            )}
            {onEdit && (
              <button
                className="btn btn-accent shadow-sm ms-auto"
                onClick={onEdit}
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                className="btn btn-accent shadow-sm ms-auto"
                onClick={onDelete}
              >
                Delete
              </button>
            )}
            {onDownload && (
              <button
                className="btn btn-accent shadow-sm ms-auto"
                onClick={onDownload}
              >
                Download
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
