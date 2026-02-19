import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6">
      <div className="text-center max-w-lg">

        <h1 className="text-7xl font-extrabold text-blue-600 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Oops! The page you're looking for doesn't exist or was moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Go to Home
        </button>

      </div>
    </div>
  );
}
