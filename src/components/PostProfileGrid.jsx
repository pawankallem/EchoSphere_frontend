import { Grid } from 'lucide-react';

export default function PostGrid({ posts, onSelect }) {

  const handleSelectPost = (post) => {
    onSelect(post);
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          <Grid className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg">No posts yet</p>
      </div>
    );
  }

  return (
    <div className={`grid ${posts?.length <= 2 ? "grid-cols-2" : "grid-cols-3"} gap-1 md:gap-4 p-3 rounded-xl mt-2`}>
      {posts && posts.length > 0 && posts.map((post) => (
        <div
          key={post._id}
          className="aspect-square bg-blue-100 relative group cursor-pointer overflow-hidden rounded-xl"
          onClick={() => handleSelectPost(post)}
        >
          <img
            src={post.image}
            alt={post.caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="font-semibold">{post.likesCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
                <span className="font-semibold">{post.commentsCount}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}