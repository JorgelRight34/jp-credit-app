import { ReactNode } from "react";

interface EntityFormLayoutProps {
  children: ReactNode;
  allowDelete?: boolean;
  onDelete?: () => void;
  onSubmit: () => void;
}

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
          Submit
        </button>
        {allowDelete && (
          <button
            type="button"
            className="btn btn-accent-secondary w-100 ms-3"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default EntityFormLayout;
