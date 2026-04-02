import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// TODO: Set to false when implementing real protected routes
const BYPASS_PROTECTION = true;

function ProtectedRoutes({ children }) {
  const { user, ready } = useAuth();

  if (!ready) return null;

  // TODO: Re-enable when implementing protected routes
  if (!BYPASS_PROTECTION && !user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

export default ProtectedRoutes;
