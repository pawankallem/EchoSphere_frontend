import DarkModeToggle from "./DarkModeToggle";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="max-w-2xl mx-auto flex justify-between items-center p-4">

        <h1 className="font-bold text-xl dark:text-white flex gap-2 items-center justify-center">
          <img src={logo} alt="Echo Sphere" width="40" className="border-white border-2 rounded-full" />
          EchoSphere
        </h1>
        {user && (
          <span className="dark:text-white font-medium">
            Hi, {user?.username}
          </span>
        )}

        <div className="flex items-center gap-3">
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

      </div>
    </div>
  );
}
