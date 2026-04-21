import axios from "axios";
import { redirect } from "@tanstack/react-router";
import { toast } from "react-toastify";

export const logoutHandler = async () => {
  try {
    await axios.post("/api/auth/logout");
    redirect({ to: "/login" });
    toast.success("User successfully logged out");
  } catch (err) {
    toast.error(`Something went wrong, Cannot log user out: ${err}`);
  }
};
