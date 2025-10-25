import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Post from "./pages/Post";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    //  Page reload hone par cookies ke through user fetch kar lo
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Post /> : <Login />}
          // element={<Login/>}
        />
        <Route
          path="/register"
         
          element={<Register/>}
        />
        <Route
          path="/post"
          element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
