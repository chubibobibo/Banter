import axios from "axios";

export const getLoggedUser = async () => {
  const userData = await axios.get("/api/auth/getLoggedUser");
  if (!userData) {
    throw new Error("Something went wrong");
  } else {
    return userData;
  }
};
