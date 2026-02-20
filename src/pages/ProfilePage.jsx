import { useEffect, useState } from "react";
import { Grid } from "lucide-react";
import ProfileHeader from "../components/ProfileHeader";
import PostGrid from "../components/PostProfileGrid";
import { fetchProfile } from "../api/profileApi";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProfile = () => {
    fetchProfile()
      .then((res) => {
        setUser(res.data.user);
        setPosts(res.data.posts);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading)
    return <div className="p-8 dark:text-white">Loading profile...</div>;

  if (!user)
    return <div className="p-8 text-red-500">User not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ProfileHeader
        user={user}
        postsCount={posts.length}
        onProfileUpdated={loadProfile}
      />

      <div className="max-w-4xl mx-auto mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
          <div className="flex justify-center border-b dark:border-gray-700">
            <button className="flex items-center gap-2 px-6 py-4 border-b-2 border-gray-800 dark:border-white dark:text-white text-xs font-semibold uppercase">
              <Grid className="w-4 h-4" />
              Posts
            </button>
          </div>
        </div>

        <div className="mt-2 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
          <PostGrid posts={posts} />
        </div>
      </div>
    </div>
  );
}