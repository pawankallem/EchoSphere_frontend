import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, createPost, likePost, savePost } from "../../api/postApi";

const initialState = {
  posts: [],
  loading: false,
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const res = await fetchPosts();
  return res.data;
});

export const addPost = createAsyncThunk("posts/addPost", async (data) => {
  await createPost(data);
  return data;
});

export const toggleLike = createAsyncThunk(
  "posts/toggleLike",
  async (postId) => {
    await likePost(postId);
    return postId;
  }
);

export const toggleSave = createAsyncThunk(
  "posts/toggleSave",
  async (postId) => {
    await savePost(postId);
    return postId;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.reverse();
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      });
  },
});

export default postSlice.reducer;