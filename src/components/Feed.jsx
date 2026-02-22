import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../features/posts/postSlice";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import PostSkeleton from "./PostSkeleton";
import PostModal from "./PostModal";

export default function Feed() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="space-y-6">

      <CreatePost />

      {loading
        ? [1, 2, 3].map((i) => <PostSkeleton key={i} />)
        : posts.map((post) => (
          <PostCard key={post._id} post={post} onSelect={() => setSelectedPost(post)} />
        ))}

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}