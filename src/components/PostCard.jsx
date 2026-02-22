import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike, toggleSave } from "../features/posts/postSlice";
import { Heart, Bookmark, MessageCircle } from "lucide-react";
import Comments from "./Comments";

export default function PostCard({ post, onSelect }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden" >

      <div className="flex items-center gap-3 p-4">
        <img
          src={
            post.author?.avatar ||
            // `https://ui-avatars.com/api/?name=${post.author?.username}`
            `https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png`
          }
          className="w-10 h-10 rounded-full"
        />

        <div>
          <p className="font-semibold dark:text-white">
            {post.author?.username}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white" onClick={onSelect}>
        <img
          src={post.image}
          className="w-full object-cover max-h-[500px]"
        />
      </div>


      <div className="p-4 space-y-3">

        <p className="dark:text-white" onClick={onSelect}>
          <span className="font-semibold mr-2">
            {post.author?.username}
          </span>
          {post.caption}
        </p>

        <div className="flex gap-6 items-center">
          <button
            onClick={() => dispatch(toggleLike(post._id))}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500"
          >
            <Heart
              size={22}
              fill={post?.likesCount > 0 && (post?.likedBy?.includes(user?.id)) ? "red" : "none"}
              color={post?.likesCount > 0 && post?.likedBy?.includes(user?.id) ? "red" : "currentColor"}
            />
            {post.likesCount}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-500"
          >
            <MessageCircle size={22} />
            {post.commentsCount}
          </button>

          <button
            onClick={() => dispatch(toggleSave(post._id))}
            className="flex items-center gap-1 hover:text-blue-500 text-gray-600 dark:text-gray-300"
          >
            <Bookmark
              size={22}
              fill={post?.savedCount > 0 && post?.savedByUsers?.includes(user?.id) ? "currentColor" : "none"}
            />
            {post.savedCount}
          </button>
        </div>

        {showComments && <Comments postId={post._id} />}
      </div>
    </div>
  );
}