import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  api,
  loginUser,
  signUpUser,
  logoutUser,
  deleteUser,
  type LoginPayload,
  type SignUpPayload,
} from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type user = {
  name: string;
  mail: string;
  role: "user" | "admin";
};

export type meResponse = {
  success: boolean;
  data: user;
  error: string;
  meta: any;
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
        toast.success("Logged in successfully");
        navigate("/u");
      } else {
        console.log("Login failed: success is false");
        toast.error(data.error || "Login failed");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "An error occurred during login");
    },
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, SignUpPayload>({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(["me"], data.data);
        toast.success("Account created successfully");
        navigate("/u");
      } else {
        toast.error(data.error || "Sign up failed");
      }
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during sign up");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (data: { success: boolean }) => {
      if (data.success) {
        queryClient.clear();
        toast.success("Logged out successfully");
        navigate("/auth/signin");
      } else {
        toast.error("Logout failed");
      }
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during logout");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data: { success: boolean }) => {
      if (data.success) {
        queryClient.clear();
        toast.success("Account deleted successfully");
        navigate("/auth/signup");
      } else {
        toast.error("Failed to delete account");
      }
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during account deletion");
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api<meResponse>(`/api/v1/users/me`);
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
