import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

export default function DarkModeToggle() {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <button
            onClick={() => {
                dispatch(toggleTheme());
            }}
            className="px-3 py-1 rounded-lg border dark:border-gray-600 dark:text-white"
        >
            {!darkMode ? "🌙" : "☀️"}
        </button>
    );
}
