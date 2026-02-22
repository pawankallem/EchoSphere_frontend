import { useEffect } from "react";
import { X, Heart, Bookmark } from "lucide-react";
import Comments from "./Comments";
import { useDispatch } from "react-redux";
import { toggleLike, toggleSave } from "../features/posts/postSlice";

export default function PostModal({ post, onClose }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const esc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", esc);
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", esc);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
          relative
          w-full h-full
          md:w-[95vw] md:h-[92vh]
          max-w-[1600px]
          bg-white dark:bg-gray-950
          md:rounded-2xl
          shadow-2xl
          overflow-hidden
          flex flex-col md:flex-row
        "
            >
                <button
                    onClick={onClose}
                    className="
            absolute top-4 right-4 z-10
            bg-black/40 hover:bg-black/60
            text-white p-2 rounded-full
            backdrop-blur
          "
                >
                    <X size={22} />
                </button>

                <div className="flex-1 bg-white flex items-center justify-center">
                    <img
                        src={post.image}
                        alt="post"
                        className="object-contain w-full h-full"
                    />
                </div>

                <div className="
          w-full md:w-[440px]
          border-t md:border-t-0 md:border-l
          border-gray-200 dark:border-gray-800
          flex flex-col
          bg-white dark:bg-gray-950
        ">

                    <div className="flex items-center gap-3 p-5 border-b border-gray-200 dark:border-gray-800">
                        <img
                            src={post.author?.avatar}
                            className="w-10 h-10 rounded-full object-cover"
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

                    <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 dark:text-gray-200 leading-relaxed">
                        <span className="font-semibold mr-2">
                            {post.author?.username}
                        </span>
                        {post.caption}
                    </div>

                    <div className="flex items-center gap-8 px-5 py-4 border-b border-gray-200 dark:border-gray-800">

                        <button
                            onClick={() => dispatch(toggleLike(post._id))}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
                        >
                            <Heart size={24} />
                            <span className="text-sm font-medium">{post.likesCount}</span>
                        </button>

                        <button
                            onClick={() => dispatch(toggleSave(post._id))}
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                        >
                            <Bookmark size={24} />
                            <span className="text-sm font-medium">{post.savedCount}</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 py-4">
                        <Comments postId={post._id || post.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}