import { useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";

function ProtectPages({ children }: { children: ReactNode }) {
  const navigate = useNavigate({ from: "/updateUser" });
  const [loggedUserData, setLoggedUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const loggedUser = await axios.get("/api/auth/getLoggedUser");
        // console.log(loggedUser);
        setLoggedUserData(loggedUser.data.loggedUser);
      } catch (err) {
        console.log(err);
        toast.error("User is not authorized");
      } finally {
        setIsLoading(false);
      }
    };
    getLoggedUser();
  }, []);

  // allows component the useEffect to run first before rendering component allowing the setloggedUserData state to be updated.
  if (isLoading) {
    return null;
  }
  console.log(loggedUserData);
  return <>{loggedUserData ? children : navigate({ to: "/login" })}</>;
}
export default ProtectPages;
