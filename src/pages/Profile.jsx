import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/user/userSlice";
import { getpostbyauthorId, deletePost } from "../features/post/postSlice";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading: userLoading, error } = useSelector((state) => state.user);
  const { posts, loading: postsLoading } = useSelector((state) => state.posts);

  const [localPosts, setLocalPosts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Fetch user once
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Fetch user posts
  useEffect(() => {
    if (user?._id) {
      dispatch(getpostbyauthorId(user._id));
    }
  }, [dispatch, user?._id]);

  // ✅ Keep localPosts synced with Redux posts
  useEffect(() => {
    if (posts?.length) {
      setLocalPosts(posts);
    }
  }, [posts]);

  // ✅ Instant like update handler
  const handleLocalLikeUpdate = (postId, isLiked) => {
    setLocalPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? { ...p, isLiked, likeCount: isLiked ? p.likeCount + 1 : p.likeCount - 1 }
          : p
      )
    );
  };

  // Delete Modal
  const handleDeleteClick = (postId) => {
    setSelectedPostId(postId);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (selectedPostId) {
      await dispatch(deletePost(selectedPostId)).unwrap();
      setShowDeleteModal(false);
      setSelectedPostId(null);

      // ✅ Show success toast
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 2500);
    }
  };

  if (userLoading || postsLoading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-[18%] border-r border-gray-800 hidden md:flex flex-col fixed left-0 top-0 h-full">
        <Sidebar />
      </div>

      {/* Profile Main */}
      <div className="flex-1 ml-[18%] mr-[22%] border-x border-gray-800 overflow-y-auto hide-scrollbar relative">
        {/* Cover + Avatar */}
        <div className="relative w-full h-56 bg-gray-900">
          <img
            src={user?.coverImage || "/default-cover.jpg"}
            alt="Cover"
            className="w-full h-full object-cover rounded-b-2xl"
          />
          <div className="absolute -bottom-14 left-6">
            <img
              src={user?.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-black object-cover"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="pt-20 px-6 pb-6 border-b border-gray-800 bg-black">
          <h2 className="text-2xl font-bold">{user?.username}</h2>
          <p className="text-gray-400 text-sm">@{user?.username?.toLowerCase()}</p>

          {user?.bio && (
            <p className="text-gray-300 mt-3 text-base leading-snug">{user.bio}</p>
          )}

          <div className="flex flex-wrap items-center text-gray-400 text-sm mt-4 gap-3">
            <p>📧 {user?.email}</p>
            <p>🗓️ Joined {new Date(user?.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 mt-6 mb-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition">
              Edit Profile
            </button>
            <button className="border border-gray-600 hover:bg-gray-800 text-white px-4 py-1.5 rounded-full text-sm font-medium transition">
              Share Profile
            </button>
          </div>
        </div>

        {/* Posts */}
        <div className="px-4 pb-24 pt-6">
          <h2 className="text-xl font-bold mb-4">Posts by {user?.username}</h2>

          {localPosts?.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">No posts yet.</p>
          ) : (
            <div className="space-y-6 relative">
              {localPosts.map((post) => {
                const fixedPost = {
                  ...post,
                  author: {
                    username: post?.author?.username || user?.username,
                    avatar: post?.author?.avatar || user?.avatar,
                    _id: post?.author?._id || user?._id,
                  },
                  likeCount: post?.likes?.length || post.likeCount || 0,
                };

                return (
                  <div
                    key={post._id}
                    className="relative group border border-gray-800 rounded-2xl hover:border-gray-700 transition"
                  >
                    {/* 🔥 Pass callback for instant like update */}
                    <PostCard post={fixedPost} onLikeUpdate={handleLocalLikeUpdate} />

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteClick(post._id)}
                      className="absolute top-4 right-4 bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                      title="Delete Post"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[22%] hidden lg:flex flex-col fixed right-0 top-0 h-full border-l border-gray-800 p-5 text-gray-400 overflow-y-auto hide-scrollbar">
        <h3 className="text-lg font-semibold mb-3">Trending</h3>
        <p className="text-sm text-gray-500">Trending topics will appear here.</p>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#16181c] p-6 rounded-2xl shadow-xl w-[90%] max-w-sm text-center border border-gray-700">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Delete this post?
            </h2>
            <p className="text-gray-400 mb-5 text-sm">
              This action cannot be undone. Are you sure?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-1.5 rounded-full border border-gray-600 hover:bg-gray-800 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-700 transition text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium animate-fadeIn z-50">
          ✅ Post deleted successfully
        </div>
      )}
    </div>
  );
};

export default Profile;
