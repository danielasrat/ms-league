import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function UserLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/users/login", form);
      // Ensure the user and token are properly stored in localStorage
      localStorage.setItem("token", res.data.token);
      const userData = await res.data.user;
      console.log(res.data.user); // Log the user data for debugging
      localStorage.setItem("user", JSON.stringify(userData)); // Store user data as stringified JSON
      window.location.href = "/user-dashboard";
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login to MS-League
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition font-medium"
            >
              Login
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-red-600">{message}</p>
          )}

          <div className="flex justify-between items-center text-sm mt-4 text-gray-600">
            <Link
              to="/forgot-password"
              className="text-yellow-600 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
            <span>
              No account?{" "}
              <Link
                to="/user-register"
                className="text-yellow-600 hover:underline font-medium"
              >
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
