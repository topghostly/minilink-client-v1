import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, loginUser, type LoginPayload } from "../api/api";
import { useNavigate } from "react-router-dom";

export type user = {
  name: string;
  mail: string;
  id: string;
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

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api<meResponse>(`/api/v1/auth/me`);
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
