import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { SignIn } from "./features/auth/auth.pages";
import { SignUp } from "./features/auth/auth.pages";
import AuthLayout from "./features/auth/auth.layout";
import DashboardLayout from "./features/dashboard/dashboard.layout";

function Router() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Route>
        <Route path="/u" element={<DashboardLayout />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>
        <Route path="/" element={<Navigate to="/u" />} />
      </Routes>
    </>
  );
}

export default Router;
