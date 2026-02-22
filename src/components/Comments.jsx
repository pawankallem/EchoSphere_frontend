import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  createComment,
  removeComment,
} from "../features/comments/commentSlice";
import toast from "react-hot-toast";

export default function Comments({ postId }) {
  const dispatch = useDispatch();
  const { commentsByPost } = useSelector((s) => s.comments);
  const { user } = useSelector((s) => s.auth);

  const comments = commentsByPost[postId] || [];

  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  const handleSubmit = () => {
    if (!text.trim()) return;

    dispatch(
      createComment({
        post: postId,
        text,
        parentComment: replyTo,
      })
    );

    setText("");
    setReplyTo(null);
  };

  const renderComments = (parent = null, level = 0) =>
    comments
      .filter((c) => c.parentComment === parent)
      .map((c) => (
        <div key={c._id} style={{ marginLeft: level * 16 }}>
          <div className="flex gap-2 mt-3">
            <img
              src={
                c.user?.avatar ||
                // `https://ui-avatars.com/api/?name=${c.user?.username}`
                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
              }
              className="w-8 h-8 rounded-full"
            />

            <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
              <p className="text-sm dark:text-white">
                <span className="font-semibold mr-2">
                  {c.user?.username}
                </span>
                {c.text}
              </p>

              <div className="flex gap-3 text-xs mt-1 text-gray-500 dark:text-gray-300">
                <button onClick={() => setReplyTo(c._id)}>Reply</button>

                {c.user?.id === user?.id && (
                  <button
                    onClick={() => {
                      dispatch(removeComment({ commentId: c._id, postId }));
                      toast.success("Deleted");
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>

          {renderComments(c._id, level + 1)}
        </div>
      ));

  return (
    <div className="mt-2">

      {renderComments()}

      {replyTo && (
        <p className="text-xs text-blue-500 mt-2">
          Replying… <button onClick={() => setReplyTo(null)}>cancel</button>
        </p>
      )}

      <div className="flex gap-2 mt-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border rounded-lg px-3 py-1 dark:bg-gray-800 dark:text-white"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-3 rounded-lg"
        >
          Post
        </button>
      </div>
    </div>
  );
}