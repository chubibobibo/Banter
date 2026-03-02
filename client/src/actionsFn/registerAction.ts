import { useMutation } from "@tanstack/react-query";
export const useRegisterAction = () => {
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return fetch("/api/auth/register", {
        method: postMessage,
        body: data,
      });
    },
  });
};
