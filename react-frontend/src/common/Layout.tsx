import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

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
