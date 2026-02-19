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


  useEffect(() => {
    if (token)
      dispatch(fetchUser());
  }, []);


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
