import api from "./api";

export const fetchPosts = () => api.get("/posts/get");

export const createPost = (data) => api.post("/posts/create", data);

export const likePost = (postId) =>
  api.put(`/posts/${postId}/like`);

export const savePost = (postId) =>
  api.put(`/posts/${postId}/save`);