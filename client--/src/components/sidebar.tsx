import {
  FaHome,
  FaBoxOpen,
  FaCashRegister,
  FaWarehouse,
  FaChartBar,
  FaUsers,
  FaCog,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
    roles: ["ADMIN"],
  },
  {
    name: "Products",
    path: "/products",
    icon: <FaBoxOpen />,
    roles: ["ADMIN"],
  },
  {
    name: "POS",
    path: "/pos",
    icon: <FaCashRegister />,
    roles: ["ADMIN", "CASHIER"],
  },
  {
    name: "Inventory",
    path: "/inventory",
    icon: <FaWarehouse />,
    roles: ["ADMIN"],
  },
  {
    name: "Reports",
    path: "/reports",
    icon: <FaChartBar />,
    roles: ["ADMIN"],
  },
  {
    name: "Sales",
    path: "/sales",
    icon: <FaCashRegister />,
    roles: ["ADMIN", "CASHIER"],
  },
  {
    name: "Users",
    path: "/users",
    icon: <FaUsers />,
    roles: ["ADMIN"],
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FaCog />,
    roles: ["ADMIN"],
  },
];

export default function Sidebar() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const role = user.role;

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-green-400">
          🏪 Sari Sari Store
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menus
  .filter((item) => item.roles.includes(role))
  .map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition
              ${
                isActive
                  ? "bg-green-500 text-white"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}

      </nav>
    </aside>
  );
}