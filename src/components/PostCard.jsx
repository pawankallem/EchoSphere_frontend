export default function PostCard({ post }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.avatar}
          className="w-10 h-10 rounded-full"
        />
        <p className="font-semibold dark:text-white">{post.user}</p>
      </div>

      <img
        src={post.image}
        className="rounded-lg mb-3"
      />

      <p className="dark:text-gray-300">
        <span className="font-semibold">{post.user}</span> {post.caption}
      </p>
    </div>
  );
}
