import api from "./api";

export const fetchComments = (postId) =>
  api.get(`/comments/${postId}`);

export const addComment = (data) =>
  api.post("/comments/send", data);

export const deleteComment = (id) =>
  api.delete(`/comments/${id}`);
