import axios from "axios";
import { useEffect } from "react";
import { redirect } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

function Logout() {
  const navigate = useNavigate({ from: "/logout" });
  useEffect(() => {
    const logout = async () => {
      await axios.post("/api/auth/logout");
    };
    logout();
    navigate({ to: "/login" });
  }, []);
  return <div>Logout</div>;
}
export default Logout;
