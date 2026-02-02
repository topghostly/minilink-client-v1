import { useMe } from "@/quaries/useMe";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !user) {
    console.log("An error from the protected route or user not found");
    return <Navigate to="/auth/signin" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
