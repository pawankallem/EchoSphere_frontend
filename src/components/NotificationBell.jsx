import { Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getNotifications,
  readNotification,
  readAllNotifications,
} from "../features/notifications/notificationSlice";

export default function NotificationBell() {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector(
    (state) => state.notifications
  );

  const [open, setOpen] = useState(false);
  const panelRef = useRef();

  useEffect(() => {
    dispatch(getNotifications());

    const interval = setInterval(() => {
      dispatch(getNotifications());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePanel = () => setOpen(!open);

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={togglePanel}
        className="relative p-2 rounded-full transition
        hover:bg-gray-200 dark:hover:bg-gray-700
        active:scale-95"
      >
        <Bell className="text-gray-800 dark:text-white" size={22} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="
          absolute right-0 mt-3 w-80
          rounded-2xl shadow-2xl border
          bg-white dark:bg-gray-800 dark:border-gray-700
          backdrop-blur-lg
          animate-in fade-in zoom-in-95
          z-50
          "
        >
          <div className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700">
            <span className="font-semibold text-gray-800 dark:text-white">
              Notifications
            </span>

            {unreadCount > 0 && (
              <button
                onClick={() => dispatch(readAllNotifications())}
                className="text-xs font-medium text-blue-500 hover:text-blue-600"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 && (
              <p className="p-6 text-center text-gray-500">
                You're all caught up 🎉
              </p>
            )}

            {notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => dispatch(readNotification(n._id))}
                className={`
                  px-4 py-3 border-b dark:border-gray-700
                  cursor-pointer transition
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  ${!n.isRead
                    ? "bg-blue-50 dark:bg-gray-700/60"
                    : ""}
                `}
              >
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">
                  <span className="font-semibold">
                    {n.sender.username}
                  </span>{" "}
                  {n.message}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}