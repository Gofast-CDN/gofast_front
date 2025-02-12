import { Navigate, useParams } from "react-router-dom";
import { isTokenValid } from "@/lib/utils/jwt";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useParams();

  if (!isTokenValid(userId)) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
