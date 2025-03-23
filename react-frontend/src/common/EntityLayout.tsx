import { ReactNode } from "react";

interface EntityLayoutProps {
  children: ReactNode;
}

const EntityLayout = ({ children }: EntityLayoutProps) => {
  return (
    <div className="p-lg-5">
      <div className="bg-white rounded-3 shadow-sm p-3">
        <div className="entity-layout p-3">{children}</div>
      </div>
    </div>
  );
};

export default EntityLayout;
