import { useQuery } from "@tanstack/react-query";
import { getLoggedUser } from "../apis/getLoggedUser";

export const useUserData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: getLoggedUser,
    staleTime: 1000 * 60 * 5,
    // staleTime: Infinity,
  });
};
