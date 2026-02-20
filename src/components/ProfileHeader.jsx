import { useEffect, useState } from "react";
import { ArrowLeft, UserPen, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api/profileApi";
import toast from "react-hot-toast";

export default function ProfileHeader({ user, postsCount, onProfileUpdated }) {
    const navigate = useNavigate();
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState({
        name: user.name,
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
        avatar: user.avatar || "",
    });
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
    const [saving, setSaving] = useState(false);

    const followersCount = user.followers?.length || 0;
    const followingCount = user.following?.length || 0;

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };


    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);

            await updateProfile(editData);

            toast.success("Profile updated");
            setEditOpen(false);

            onProfileUpdated?.();

        } catch (err) {
            toast.error("Update failed");
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        setEditData({
            name: user.name,
            bio: user.bio || "",
            location: user.location || "",
            website: user.website || "",
            avatar: user.avatar || "",
        });
    }, [user]);

    return (
        <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center mb-4">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                        <span className="text-base font-medium">Back</span>
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex justify-center md:justify-start">
                        <img
                            src={user.avatar || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                            alt={user.name}
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <h1 className="text-2xl font-light text-gray-800 dark:text-white">
                                {user.username}
                            </h1>
                            <button
                                onClick={() => setEditOpen(true)}
                                className="px-6 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-semibold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex gap-2 items-center"
                            >
                                <UserPen className="w-5 h-5" /> Edit Profile
                            </button>
                        </div>

                        <div className="flex gap-8 text-base">
                            <div>
                                <span className="font-semibold text-gray-800 dark:text-white">
                                    {postsCount}
                                </span>
                                <span className="text-gray-800 dark:text-gray-300 ml-1">
                                    posts
                                </span>
                            </div>
                            <div
                                className="relative cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
                                onMouseEnter={() => setShowFollowers(true)}
                                onMouseLeave={() => setShowFollowers(false)}
                            >
                                <span className="font-semibold text-gray-800 dark:text-white">
                                    {followersCount}
                                </span>
                                <span className="text-gray-800 dark:text-gray-300 ml-1">
                                    followers
                                </span>

                                {showFollowers && (
                                    <div className="absolute top-6 left-0 bg-white dark:bg-gray-800 shadow-lg border dark:border-gray-700 rounded-md p-4 w-64 z-50">
                                        <p className="text-gray-500 text-sm">Feature coming soon</p>
                                        {/* {user.followers?.length > 0 ? (
                                            user.followers.map((f) => (
                                                <div key={f.id} className="flex items-center gap-2 mb-2">
                                                    <img
                                                        src={f.avatar}
                                                        alt={f.username}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    <span className="text-sm text-gray-800 dark:text-white">
                                                        {f.username}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm">No followers</p>
                                        )} */}
                                    </div>
                                )}
                            </div>

                            <div
                                className="relative cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
                                onMouseEnter={() => setShowFollowing(true)}
                                onMouseLeave={() => setShowFollowing(false)}
                            >
                                <span className="font-semibold text-gray-800 dark:text-white">
                                    {followingCount}
                                </span>
                                <span className="text-gray-800 dark:text-gray-300 ml-1">
                                    following
                                </span>

                                {showFollowing && (
                                    <div className="absolute top-6 left-0 bg-white dark:bg-gray-800 shadow-lg border dark:border-gray-700 rounded-md p-4 w-64 z-50">
                                        <p className="text-gray-500 text-sm">Feature coming soon</p>
                                        {/* {user.following?.length > 0 ? (
                                            user.following.map((f) => (
                                                <div key={f.id} className="flex items-center gap-2 mb-2">
                                                    <img
                                                        src={f.avatar}
                                                        alt={f.username}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    <span className="text-sm text-gray-800 dark:text-white">
                                                        {f.username}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm">No following</p>
                                        )} */}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <h2 className="font-semibold text-gray-800 dark:text-white">
                                {user.name}
                            </h2>
                            {user.bio && (
                                <p className="text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
                                    {user.bio}
                                </p>
                            )}
                            {user.location && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {user.location}
                                </p>
                            )}
                            {user.website && (
                                <a
                                    href={`https://${user.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold block"
                                >
                                    {user.website}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {editOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

                    <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-2xl p-6 sm:p-8">

                        <button
                            onClick={() => setEditOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                            Edit Profile
                        </h2>

                        <form className="space-y-4" onSubmit={handleEditSubmit}>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Name
                                </label>
                                <input
                                    name="name"
                                    value={editData.name}
                                    onChange={handleEditChange}
                                    placeholder="Enter your name"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Bio
                                </label>
                                <textarea
                                    name="bio"
                                    rows="3"
                                    value={editData.bio}
                                    onChange={handleEditChange}
                                    placeholder="Tell something about yourself"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Location
                                </label>
                                <input
                                    name="location"
                                    value={editData.location}
                                    onChange={handleEditChange}
                                    placeholder="City, Country"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Website
                                </label>
                                <input
                                    name="website"
                                    value={editData.website}
                                    onChange={handleEditChange}
                                    placeholder="https://example.com"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Avatar URL
                                </label>
                                <input
                                    name="avatar"
                                    value={editData.avatar}
                                    onChange={handleEditChange}
                                    placeholder="Paste image URL"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>

                            <button
                                disabled={saving}
                                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}