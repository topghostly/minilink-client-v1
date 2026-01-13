import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

export type Link = {
  id: string;
  original_link: string;
  short_link: string;
  click_counts: number;
  created_at: string;
};
type AllLinks = {
  data: Link[];
  error: string;
  meta: string;
  success: boolean;
};

export const useUserLinks = () => {
  console.log("Starting getting link");
  return useQuery({
    queryKey: ["user-links"],
    queryFn: async () => {
      const response = await api<AllLinks>(
        `${import.meta.env.VITE_BASE_URL}api/v1/links/all`
      );
      console.log(`The links responce is ${response}`);
      return response.data;
    },
  });
};
