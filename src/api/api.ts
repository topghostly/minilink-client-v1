import type { LoginResponse } from "@/quaries/useMe";

export type LoginPayload = {
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
  console.log(data);
  return data as T;
};

export const loginUser = (payload: LoginPayload) => {
  console.log(payload);
  return api<LoginResponse>("/api/v1/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
