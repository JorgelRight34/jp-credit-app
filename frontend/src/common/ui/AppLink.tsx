import { ReactNode } from "react";
import { Link } from "react-router";

interface AppLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}

const AppLink = ({ to, children, onClick, className = "" }: AppLinkProps) => {
  return (
    <Link
      className={`link-reset text-accent-secondary ${className}`}
      onClick={onClick}
      to={to}
    >
      {children}
    </Link>
  );
};

export default AppLink;
