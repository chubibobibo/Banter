import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLoggedUser } from "../apis/getLoggedUser";
import { type ReactNode } from "react";

function LoggedUserQuery({ children }: { children: ReactNode }) {
  //queries
  const {
    isLoading,
    isError,
    error,
    data: loggedUserData,
  } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: getLoggedUser,
  });

  //status handling
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (isLoading) {
    return <span>Loading, please wait...</span>;
  }
  return <>{loggedUserData && children}</>;
}
export default LoggedUserQuery;
