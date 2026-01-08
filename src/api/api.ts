import type { LoginResponse } from "@/quaries/useMe";

export type LoginPayload = {
  mail: string;
  password: string;
};

export type SignUpPayload = {
  name: string;
  mail: string;
  password: string;
};

export const api = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!response.ok) {
    try {
      const error = await response.json();
      console.log(error);
    } catch (e) {
      console.error("Failed to parse error response", e);
    }
    throw new Error("API response was not ok");
  }
  const data = await response.json();
  return data as T;
};

export const loginUser = (payload: LoginPayload) => {
  console.log(payload);
  return api<LoginResponse>("/api/v1/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const signUpUser = (payload: SignUpPayload) => {
  console.log(payload);
  return api<LoginResponse>("/api/v1/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const logoutUser = () => {
  return api<{ success: boolean }>("/api/v1/auth/sign-out", {
    method: "POST",
  });
};

export const deleteUser = () => {
  return api<{ success: boolean }>("/api/v1/users/me", {
    method: "DELETE",
  });
};
