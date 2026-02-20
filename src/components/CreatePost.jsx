import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/posts/postSlice";
import toast from "react-hot-toast";

export default function CreatePost() {
  const dispatch = useDispatch();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      return toast.error("Please add an image");
    }

    dispatch(addPost({ caption, image }));
    toast.success("Post created 🚀");

    setCaption("");
    setImage("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2 outline-none"
        />

        <input
          type="text"
          placeholder="Paste image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-2"
        />

        {image && (
          <img
            src={image}
            alt="preview"
            className="rounded-lg max-h-64 object-cover"
          />
        )}

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700">
          Post
        </button>
      </form>
    </div>
  );
}