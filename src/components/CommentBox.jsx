import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../features/comments/commentSlice";
import { FaTrash } from "react-icons/fa";

const MAX_COMMENT_LENGTH = 200;

const CommentBox = ({ postId, postAuthorId }) => {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.user); // Current Logged-in User
  const [message, setMessage] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (postId) dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (message.length > MAX_COMMENT_LENGTH) return;
    dispatch(addComment({ postId, message }));
    setMessage("");
  };

  // ✅ Delete Handlers
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(deleteComment(deleteId));
    setShowConfirm(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  const commentsToDisplay = comments || [];

  return (
    <div className="text-white relative" onClick={(e) => e.stopPropagation()}>
      
      {/* 💬 Input box */}
      <form onSubmit={handleSubmit} className="flex space-x-3 mb-4">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Write a comment (Max ${MAX_COMMENT_LENGTH} chars)...`}
          maxLength={MAX_COMMENT_LENGTH}
          className="flex-1 bg-transparent text-white border-b border-gray-700 outline-none"
        />
        <button
          type="submit"
          className="text-blue-500 font-semibold hover:text-blue-400 disabled:opacity-50"
          disabled={loading || !message.trim()}
        >
          Post
        </button>
      </form>

      <p className="text-right text-xs text-gray-500 mt-[-10px] mb-3">
        {message.length} / {MAX_COMMENT_LENGTH}
      </p>

      {loading && <p className="text-gray-500 text-sm">Loading comments...</p>}

      {/* 🧾 Comments count */}
      <h3 className="text-lg font-semibold mb-3">
        Comments ({commentsToDisplay.length})
      </h3>

      {/* 🧾 Comments list */}
      <div className="space-y-3">
        {commentsToDisplay.length === 0 ? (
          <p className="text-gray-400 text-sm">No comments yet.</p>
        ) : (
          commentsToDisplay.map((c) => {
            // ✅ Delete Logic Check
            const canDelete =
              c.author?._id === user?._id || // User can delete their own comment
              postAuthorId === user?._id;   // Post Author can delete any comment

            return (
              <div
                key={c._id}
                className="flex items-start space-x-3 border-b border-gray-800 pb-2"
              >
                <img
                  src={c.author?.avatar || "/default-avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm text-white">
                      {c.author?.username || "Unknown"}
                    </p>

                    {canDelete && (
                      <button
                        onClick={() => handleDeleteClick(c._id)}
                        className="text-red-500 text-xs hover:text-red-400"
                        title="Delete comment"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm">{c.message}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ⚠️ Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-center w-80 border border-gray-700">
            <p className="text-lg font-semibold mb-3 text-white">
              Are you sure you want to delete this comment?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentBox;