import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import POS from "./pages/POS";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Sales from "./pages/Sales";
import Receipt from "./pages/Receipt";

import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public */}

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Receipt (NO SIDEBAR / NO NAVBAR) */}

        <Route
          path="/receipt/:id"
          element={
            <ProtectedRoute>
              <Receipt />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/products" element={<Products />} />

          <Route path="/pos" element={<POS />} />

          <Route path="/inventory" element={<Inventory />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/users" element={<Users />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/sales" element={<Sales />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;