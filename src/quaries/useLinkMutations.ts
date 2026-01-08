import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";

export const useDeleteLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await api(`/api/v1/links/delete/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-links"] });
    },
  });
};

export const useEditLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      id: string;
      original_link: string;
      human_readable: boolean;
    }) => {
      return await api(`/api/v1/links/update/${payload.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-links"] });
    },
  });
};

export const useCreateLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      original_link: string;
      is_human_readable: boolean;
    }) => {
      return await api(`/api/v1/links/create`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-links"] });
    },
  });
};
