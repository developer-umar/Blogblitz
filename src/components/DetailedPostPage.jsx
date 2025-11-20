import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../features/post/postSlice";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import { FaArrowLeft } from "react-icons/fa"; // Back button icon

const DetailedPostPage = () => {
    const { postId } = useParams(); // URL से postId लेंगे
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // ✅ Updated: Redux से singlePost state को 'state.post' key से लें
    // Note: अगर आपके Redux store में key 'posts' है, तो इसे state.posts ही रखें।
    const { singlePost, loading, error } = useSelector((state) => state.posts); 

    useEffect(() => {
        // Component mount होते ही Post fetch करें
        if (postId) {
            dispatch(getPostById(postId));
        }
    }, [dispatch, postId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    // अगर error हो या post न मिले
    if (error || !singlePost) {
        return (
            <div className="min-h-screen bg-black text-white p-5">
                <div className="max-w-xl mx-auto border border-gray-800 rounded-xl p-5 mt-10">
                    <h2 className="text-xl font-bold mb-4">Post not found!</h2>
                    <p className="text-gray-400">Error: {error || "The post might have been deleted or the link is incorrect."}</p>
                    <button
                        onClick={() => navigate('/post')}
                        className="mt-5 text-blue-400 hover:text-blue-300 flex items-center space-x-2"
                    >
                        <FaArrowLeft />
                        <span>Go back to Feed</span>
                    </button>
                </div>
            </div>
        );
    }
    
    // Post display करें (Twitter style UI)
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-xl mx-auto border-x border-gray-800 min-h-screen">
                
                {/* Header/Back Button */}
                <div className="sticky top-0 bg-black/90 backdrop-blur-sm p-4 border-b border-gray-800 flex items-center space-x-4">
                    <button
                        onClick={() => navigate(-1)} // एक स्टेप पीछे navigate करेगा
                        className="text-white hover:text-gray-400 transition"
                        title="Go Back"
                    >
                        <FaArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-bold">Post</h1>
                </div>

                {/* Detailed Post Card. isDetailed=true pass किया गया है */}
                <div className="border-b border-gray-800">
                    <PostCard post={singlePost} isDetailed={true} /> 
                    {/* PostCard के अंदर ही कमेंट बॉक्स/सेक्शन (isDetailed prop के कारण) दिखाई देगा */}
                </div>
            </div>
        </div>
    );
};

export default DetailedPostPage;