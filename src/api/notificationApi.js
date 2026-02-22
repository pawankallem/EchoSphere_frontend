import api from "./api";

export const fetchNotifications = () => api.get("/notifications/all");

export const markNotificationRead = (id) =>
  api.put(`/notifications/read/${id}`);

export const markAllNotificationsRead = () =>
  api.put("/notifications/read-all");