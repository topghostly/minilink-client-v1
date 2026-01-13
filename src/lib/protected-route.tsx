import { useMe } from "@/quaries/useMe";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isError, status } = useMe();

  // if (isLoading) return <div>Loading...</div>;

  if (isError || status !== "success") {
    console.log("An error from the protected route");
    return <Navigate to="/auth/signin" />;
  }

  return children;
};

export default ProtectedRoute;
