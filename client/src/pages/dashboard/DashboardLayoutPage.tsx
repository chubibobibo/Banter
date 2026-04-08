import { Outlet } from "@tanstack/react-router";
import Navbar from "../../components/Navbar";

function DashboardLayoutPage() {
  return (
    <div className='block h-screen md:flex'>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default DashboardLayoutPage;
