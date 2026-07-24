import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
    const response = await api.post(
  "/auth/login",
  {
    email,
    password
  }
);


localStorage.setItem(
  "token",
  response.data.token
);


localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);


navigate("/dashboard");
    }
    catch (error) {
        console.error(
            "Login failed",
            error
        );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="bg-emerald-500 w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl">
            🛒
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Sari-Sari Store Login
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to continue
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Login
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          © 2026 Sari-Sari Store
        </p>
      </div>
    </div>
  );
}