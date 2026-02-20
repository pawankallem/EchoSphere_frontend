import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../../api/commentApi";

const initialState = {
  commentsByPost: {},
  loading: false,
};

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (postId) => {
    const res = await fetchComments(postId);
    return { postId, comments: res.data };
  }
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (data) => {
    await addComment(data);
    return data;
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async (commentId) => {
    await deleteComment(commentId);
    return commentId;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.commentsByPost[action.payload.postId] =
          action.payload.comments;
      });
  },
});

export default commentSlice.reducer;