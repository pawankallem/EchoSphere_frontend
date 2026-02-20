import { useDispatch } from "react-redux";
import { toggleLike, toggleSave } from "../features/posts/postSlice";
import { Heart, Bookmark } from "lucide-react";

export default function PostCard({ post }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">

      <img src={post.image} className="w-full object-cover max-h-[450px]" />

      <div className="p-4 space-y-3">

        <p className="dark:text-white">{post.caption}</p>

        <div className="flex gap-6">
          <button
            onClick={() => dispatch(toggleLike(post._id))}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500"
          >
            <Heart size={20} />
            {post.likes?.length || 0}
          </button>

          <button
            onClick={() => dispatch(toggleSave(post._id))}
            className="hover:text-blue-500 text-gray-600 dark:text-gray-300"
          >
            <Bookmark size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}