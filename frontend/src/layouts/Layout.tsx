import { ReactNode } from "react";
import Navbar from "../common/ui/Navbar";

interface LayoutProps {
  children: ReactNode;
}

/**
 * A layout component that wraps its children with a navbar on the left side.
 * It is used to provide a consistent layout structure across different pages.
 * @component
 * @param {LayoutProps} props - The props for the layout component.
 * @param {ReactNode} props.children - The content to be displayed inside the layout.
 * @returns {JSX.Element} The rendered layout component.
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="row h-100 mx-0">
      <div className="col-lg-2 h-100 p-0">
        <Navbar />
      </div>
      <div className="col-lg-10">{children}</div>
    </div>
  );
};

export default Layout;
