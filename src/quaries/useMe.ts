import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, type LoginPayload } from "../api/api";
import { useNavigate } from "react-router-dom";

export type user = {
  name: string;
  mail: string;
  id: string;
  role: "user" | "admin";
};
export type LoginResponse = {
  success: boolean;
  data: user;
  error: string;
  meta: any;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login success data:", data);
      if (data.success) {
        queryClient.setQueryData(["me"], data.data);
        console.log("Navigating to /u");
        navigate("/u");
      } else {
        console.log("Login failed: success is false");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
