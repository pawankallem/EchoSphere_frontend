import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../api/notificationApi";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
};

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async () => {
    const res = await fetchNotifications();
    return res.data;
  }
);

export const readNotification = createAsyncThunk(
  "notifications/readNotification",
  async (id) => {
    await markNotificationRead(id);
    return id;
  }
);

export const readAllNotifications = createAsyncThunk(
  "notifications/readAllNotifications",
  async () => {
    await markAllNotificationsRead();
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter(n => !n.isRead).length;
      })
      .addCase(readNotification.fulfilled, (state, action) => {
        const n = state.notifications.find(x => x._id === action.payload);
        if (n && !n.isRead) {
          n.isRead = true;
          state.unreadCount--;
        }
      })
      .addCase(readAllNotifications.fulfilled, (state) => {
        state.notifications.forEach(n => (n.isRead = true));
        state.unreadCount = 0;
      });
  },
});

export default notificationSlice.reducer;