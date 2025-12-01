import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Post from "./pages/Post";
import DetailedPostPage from "./components/DetailedPostPage";
import Profile from "./pages/Profile"; // 
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:postId" element={<DetailedPostPage />} />

        {/* ✅ New Profile Route */}
        <Route path="/profile" element={<Profile />} />

        <Route path ="/create-post" element={<CreatePost/>}  />

        {/* Optional: Redirect unknown routes */}
        {/* <Route path="*" element={<Navigate to="/post" />} /> */}

      </Routes>
    </>
  );
}

export default App;
