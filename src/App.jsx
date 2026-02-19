import { Toaster } from 'react-hot-toast'
import './App.css'
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login';
import FeedPage from "./pages/FeedPage";

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    console.log("Dark mode changed:", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  console.log(darkMode);

  return (

    <div className={darkMode ? "dark" : ""}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
