import { jwtDecode } from "jwt-decode";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProsp {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProsp) => {
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
