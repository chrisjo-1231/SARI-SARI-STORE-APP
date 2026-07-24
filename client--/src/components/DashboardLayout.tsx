import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}