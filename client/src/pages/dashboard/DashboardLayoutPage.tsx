import { Outlet } from "@tanstack/react-router";
import Navbar from "../../components/Navbar";
import { getLoggedUser } from "../../apis/getLoggedUser";
import { useQuery } from "@tanstack/react-query";
import { IconHandLittleFinger } from "@tabler/icons-react";

function DashboardLayoutPage() {
  //fetching data from API
  const {
    data: userData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: getLoggedUser,
  });
  console.log(userData);
  return (
    <div className='block h-screen md:flex'>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default DashboardLayoutPage;
