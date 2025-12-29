import { Routes, Route } from "react-router-dom";
import "./App.css";
import { SignIn } from "./features/auth/auth.pages";
import { SignUp } from "./features/auth/auth.pages";
import AuthLayout from "./features/auth/auth.layout";

function Router() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
