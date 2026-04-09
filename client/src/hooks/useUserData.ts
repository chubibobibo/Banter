import { useSuspenseQuery } from "@tanstack/react-query";
import { getLoggedUser } from "../apis/getLoggedUser";

//** @useSuspenseQuery allows resolution of query  */
export const useUserData = () => {
  return useSuspenseQuery({
    queryKey: ["userData"],
    queryFn: getLoggedUser,
    staleTime: 1000 * 60 * 5,
    // staleTime: Infinity,
  });
};
