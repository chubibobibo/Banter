import axios from "axios";
import { toast } from "react-toastify";

export const userLoaderData = async () => {
  const userData = await axios.get("/api/auth/getLoggedUser");
  //   console.log(userData);
  if (!userData) {
    toast.error("User not logged in");
    return null;
  }
  return userData;
};
