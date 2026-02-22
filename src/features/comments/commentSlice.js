import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchComments, addComment, deleteComment } from "../../api/commentApi";

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
  async ({ post, text, parentComment }, { dispatch }) => {
    await addComment({ post, text, parentComment });

    dispatch(getComments(post));

    return post;
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async ({ commentId, postId }, { dispatch }) => {
    await deleteComment(commentId);

    dispatch(getComments(postId));

    return postId;
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
        state.commentsByPost[action.payload.postId] = action.payload.comments;
      });
  },
});

export default commentSlice.reducer;
