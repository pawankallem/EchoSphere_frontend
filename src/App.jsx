import { Toaster } from 'react-hot-toast'
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login';
import FeedPage from "./pages/FeedPage";
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import { fetchUser } from './features/auth/authSlice';
import ProfilePage from "./pages/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);


  // useEffect(() => {
  //   if (token)
  //     dispatch(fetchUser());
  // }, []);

  useEffect(() => {
    // ⚠️ TODO:
    // There is a render dependency issue here.
    // Currently this runs on a timer to keep the backend session active.
    // In the future we should refactor this to avoid unnecessary re-renders
    // and use a proper refresh/session strategy.

    if (!token) return;

    const fetchUserData = () => {
      console.log("🚀 Pinged the backend to keep it awake… coffee delivered ☕");
      dispatch(fetchUser());
    };

    // initial call
    fetchUserData();

    // call every 1 minute
    const interval = setInterval(fetchUserData, 60000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [token, dispatch]);


  return (

    <div className={darkMode ? "dark" : ""}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <CreateAccount />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
