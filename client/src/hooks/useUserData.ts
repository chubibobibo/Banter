import { useSuspenseQuery } from "@tanstack/react-query";
import { getLoggedUser } from "../apis/getLoggedUser";

//** @useSuspenseQuery allows resolution of query  */
export const useUserData = () => {
  return useSuspenseQuery({
    queryKey: ["userData"],
    queryFn: getLoggedUser,
  });
};
