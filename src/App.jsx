import { Toaster } from 'react-hot-toast'
import './App.css'
import CreateAccount from './pages/CreateAccount'
import Login from './pages/Login'
import { useSelector } from "react-redux";
import FeedPage from "./pages/FeedPage";
import { useEffect } from 'react';

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
      <FeedPage />

      {/* <CreateAccount /> */}
      {/* <Login /> */}
    </div>
  )
}

export default App
