import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import PostSkeleton from "./PostSkeleton";

export default function Feed() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          user: "Rahul",
          avatar: "https://i.pravatar.cc/150?img=12",
          image: "https://picsum.photos/500/400?1",
          caption: "Beautiful sunset 🌅",
        },
        {
          id: 2,
          user: "Amit",
          avatar: "https://i.pravatar.cc/150?img=15",
          image: "https://picsum.photos/500/400?2",
          caption: "Travel diaries ✈️",
        },
      ]);
    }, 1500);
  }, []);

  return (
    <div className="space-y-6">
      {!posts
        ? [1, 2, 3].map((_, i) => <PostSkeleton key={i} />)
        : posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
    </div>
  );
}
