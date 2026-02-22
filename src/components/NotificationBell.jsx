import { Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getNotifications,
  readNotification,
  readAllNotifications,
} from "../features/notifications/notificationSlice";

const formatTime = (date) => {
  const diff = Math.floor((new Date() - new Date(date)) / 1000);

  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;

  return new Date(date).toLocaleDateString();
};

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
    rounded-2xl shadow-xl border
    bg-white dark:bg-gray-900 dark:border-gray-700
    z-50 overflow-hidden
    animate-in fade-in zoom-in-95
    "
        >
          <div className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700">
            <span className="font-semibold text-gray-900 dark:text-white">
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

          <div className="max-h-96 overflow-y-auto divide-y dark:divide-gray-700">
            {notifications.length === 0 && (
              <p className="p-6 text-center text-gray-500">
                You're all caught up 🎉
              </p>
            )}

            {notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => dispatch(readNotification(n._id))}
                className="
          flex gap-3 px-4 py-3
          cursor-pointer transition
          hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-sm
          "
              >
                <img
                  src={n.sender.avatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">
                    <span className="font-semibold">
                      {n.sender.username}
                    </span>{" "}
                    {n.message}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(n.createdAt)}
                  </p>
                </div>

                {!n.isRead && (
                  <span className="mt-2 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                )}
                {/* for showing post img if post present */}
                {/* {n.post && (
                  <img
                    src={n.postThumbnail}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                )} */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}