import axios from "axios";
import { toast } from "react-toastify";

interface logoutHandlerType {
  // defines the shape or structure of the navigate function
  navigate: (option: { to: string }) => void;
}

/** logoutHandler accepts the navigate props from UserProfileComponent. This allow the use of the useNavigate hook outside a function component. */
export const logoutHandler = async ({ navigate }: logoutHandlerType) => {
  try {
    await axios.post("/api/auth/logout");
    toast.success("User successfully logged out");
    navigate({ to: "/login" });
  } catch (err) {
    console.log(err);
    toast.error(`Something went wrong, Cannot log user out: ${err}`);
  }
};
