import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login", { replace: true });
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="EchoSphere"
              className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-300"
            />
            <span className="ml-2 font-bold text-xl text-gray-800 dark:text-white">
              EchoSphere
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Future Search Bar Placeholder */}
            {/* <div className="hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white outline-none w-64"
              />
            </div> */}

            {user && (
              <span className="hidden md:block dark:text-white font-medium">
                Hi, {user.username}
              </span>
            )}

            <button
              onClick={handleProfile}
              className="px-3 py-1 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
            >
              Profile
            </button>
            <NotificationBell />

            <DarkModeToggle />

            {user && (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-800 dark:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 px-2 pb-4">
            <div className="flex flex-col gap-2">
              {user && (
                <span className="dark:text-white font-medium">
                  Hi, {user.username}
                </span>
              )}
              <button
                onClick={handleProfile}
                className="w-full px-3 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                Profile
              </button>
              <NotificationBell />
              <DarkModeToggle />
              {user && (
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              )}
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white outline-none w-full"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}