import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaRegComment, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../features/post/postSlice.js";
import { fetchComments } from "../features/comments/commentSlice";
import CommentBox from "./CommentBox";

const PostCard = ({ post, isDetailed = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { commentsByPost } = useSelector((state) => state.comment);
  const comments = commentsByPost?.[post._id] || [];

  const [showComments, setShowComments] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentCommentCount = comments.length;

  //  Handle Like
  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      await dispatch(toggleLike(post._id)).unwrap();
    } catch (error) {
      console.error("Like toggle failed:", error);
    } finally {
      setIsLiking(false);
    }
  };

  // 💬 Toggle Comments Overlay
  const handleCommentToggle = () => {
    if (isDetailed) return;
    if (!showComments) dispatch(fetchComments(post._id));
    setShowComments(!showComments);
  };

  // 🔄 Share Post
  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${post._id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this post!",
          text: post.content || "Look at this amazing post!",
          url: postUrl,
        });
      } else {
        await navigator.clipboard.writeText(postUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  // 🧭 Navigate to Detailed Page
  const handlePostClick = (e) => {
    const isInteractive = e.target.closest("button, a, video, img");
    if (isInteractive || isDetailed) return;
    navigate(`/post/${post._id}`);
  };

  const isVideo = (url) =>
    [".mp4", ".mov", ".webm", ".ogg", ".avi"].some((ext) =>
      url?.toLowerCase().endsWith(ext)
    );
  const isImage = (url) =>
    [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"].some((ext) =>
      url?.toLowerCase().endsWith(ext)
    );

  const SHOW_MORE_THRESHOLD = 150;
  const needsSeeMore = post.content?.length > SHOW_MORE_THRESHOLD;

  return (
    <div
      className={`border-b border-gray-800 p-4 transition duration-200 ${
        !isDetailed ? "hover:bg-[#16181c] cursor-pointer" : ""
      }`}
      onClick={handlePostClick}
    >
      {/* 🧑 Header */}
      <div className="flex items-center space-x-3 mb-2">
        <img
          src={post.author?.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold text-white">
            {post.author?.username || "Unknown User"}
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* 📝 Content */}
      {post.content && (
        <div className="text-white mb-2 whitespace-pre-wrap">
          <p
            className={`${
              !expanded && needsSeeMore ? "line-clamp-3" : ""
            } break-words`}
          >
            {post.content}
          </p>
          {needsSeeMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-400 hover:underline text-sm inline-block mt-[-2px] ml-1"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      )}

      {/* 🖼️ Media */}
      {post.image && (
        <div className="rounded-2xl overflow-hidden border border-gray-700 mb-3 flex justify-center bg-black">
          {isVideo(post.image) ? (
            <video
              src={post.image}
              autoPlay
              muted
              playsInline
              controls
              className="w-full h-auto max-h-[700px] object-contain rounded-2xl"
            />
          ) : isImage(post.image) ? (
            <img
              src={post.image}
              alt="post"
              className="w-full h-auto max-h-[700px] object-contain rounded-2xl"
              loading="lazy"
            />
          ) : null}
        </div>
      )}

      {/* 💬 Actions */}
      <div className="flex items-center space-x-6 text-gray-400 mt-2 px-2">
        {/* ❤️ Like */}
        <button
          type="button"
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center space-x-2 cursor-pointer transform transition hover:scale-110 ${
            isLiking ? "opacity-50 cursor-not-allowed" : "hover:text-pink-500"
          }`}
          title="Like Post"
        >
          {post.isLiked ? <FaHeart className="text-pink-500" /> : <FaRegHeart />}
         { isDetailed ? <span>{post.likesCount || 0}</span>  : <span>{post.likeCount || 0}  </span> }
        </button>

        {/* 💬 Comment */}
        <button
          onClick={handleCommentToggle}
          className="flex items-center space-x-2 hover:text-blue-400 cursor-pointer transform transition hover:scale-110"
          title="View Comments"
        >
          <FaRegComment />
        </button>

        {/* 🔄 Share */}
        <button
          onClick={handleShare}
          className="flex items-center space-x-2 hover:text-green-400 cursor-pointer transform transition hover:scale-110"
          title="Share Post"
        >
          <FaShareAlt />
          <span>{copied ? "Copied!" : "Share"}</span>
        </button>
      </div>

      {/* 💬 Comments Overlay (Feed Page Only) */}
      {!isDetailed && showComments && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"onClick={(e) => e.stopPropagation()} >
            
          <div className="bg-[#0f1115] rounded-2xl w-[90%] max-w-lg max-h-[85vh] overflow-y-auto p-5 relative shadow-lg shadow-black/40"  onClick={(e) => e.stopPropagation()}>
           

            <div className="flex justify-between items-center mb-3 border-b border-gray-700 pb-2">
              <h2 className="text-white font-semibold text-lg">
                {/* Comments ({currentCommentCount}) */}
              </h2>
              <button
                onClick={() => setShowComments(false)}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            <CommentBox postId={post._id} postAuthorId={post.author?._id} />
          </div>
        </div>
      )}

      {/* 🟢 Detailed Page Scrollable Comment Section */}
      {isDetailed && (
        <div className="max-h-[70vh] overflow-y-auto hide-scrollbar mt-4 border-t border-gray-800 pt-4">
          <CommentBox postId={post._id} postAuthorId={post.author?._id} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
