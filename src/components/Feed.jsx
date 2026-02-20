import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../features/posts/postSlice";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import PostSkeleton from "./PostSkeleton";

export default function Feed() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="space-y-6">

      <CreatePost />

      {loading
        ? [1, 2, 3].map((i) => <PostSkeleton key={i} />)
        : posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
    </div>
  );
}