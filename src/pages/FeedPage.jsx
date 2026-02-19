import Navbar from "../components/Navbar";
import Feed from "../components/Feed";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-2xl mx-auto p-4">
        <Feed />
      </div>
    </div>
  );
}
