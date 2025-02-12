// src/routing/ProtectedRoute.tsx
import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/auth/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, hasAccess } = useAuth();
  const { userId } = useParams();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userId && !hasAccess(userId)) {
    return <div>unauthorized</div>;
  }

  return <>{children}</>;
}
