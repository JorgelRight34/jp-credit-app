import { jwtDecode } from "jwt-decode";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * A protected route component that guards access to its children based on authentication status.
 * If the user is authenticated, it renders the children; otherwise, it redirects to the login page.
 * @component
 * @param {ProtectedRouteProps} props - The props for the protected route component.
 * @param {ReactNode} props.children - The content to be displayed if the user is authenticated.
 * @returns {JSX.Element} The rendered navbar component.
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  const checkIfAuthorized = () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const decoded = jwtDecode(token);
      if (decoded) {
        const expiration = decoded.exp!;
        const now = Date.now() / 1000;
        if (expiration > now) {
          setIsAuthenticated(true);
          return;
        }
      }
    }
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkIfAuthorized();
  }, []);

  if (isAuthenticated) return children;
  if (isAuthenticated === false) return <Navigate to="/login" />;
  if (isAuthenticated === undefined) return <div>...</div>;
};

export default ProtectedRoute;
