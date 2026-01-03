import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

export type userLink = {
  id: string;
  original_link: string;
  short_link: string;
  click_counts: number;
  created_at: string;
};

export const useUserLinks = (user_id: string) => {
  return useQuery({
    queryKey: ["user-links", user_id],
    queryFn: () => api<userLink[]>(`/user-links/${user_id}`),
    enabled: !!user_id,
  });
};
