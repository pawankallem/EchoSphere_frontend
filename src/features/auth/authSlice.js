import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, getCurrentUser } from "../../api/authApi";

const token = localStorage.getItem("token");

const initialState = {
  user: null,
  token: token || null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const res = await registerUser(userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await loginUser(userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const res = await getCurrentUser();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Session expired");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
