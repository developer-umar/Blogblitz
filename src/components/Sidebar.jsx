
import {
  FaHashtag,
  FaUser,
  FaSignOutAlt,
  FaRegNewspaper,
  FaFeather,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 Logout Handler
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  // 🧭 Menu Items WITHOUT logout
  const menuItems = [
    { icon: <FaRegNewspaper />, label: "All Posts", path: "/post" },

    {
      icon: <FaHashtag />,
      label: "Explore",
      onClick: () => {
        

        // 🔥 After navigating, focus Search bar
        setTimeout(() => {
          window.dispatchEvent(new Event("focus-search"));
        }, 50);
      },
    },

    { icon: <FaUser />, label: "Profile", path: "/profile" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handlePost = () => {
    navigate("/create-post");
  };

  return (
    <div className="flex flex-col justify-between h-full p-5 bg-black text-white border-r border-gray-800">
      {/* Logo */}
      <div>
        <h1
          onClick={() => navigate("/post")}
          className="text-2xl font-bold text-blue-400 mb-6 pl-2 cursor-pointer"
        >
          MicroBlog
        </h1>

        {/* Menu */}
        <ul className="space-y-6">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() =>
                item.onClick ? item.onClick() : handleNavigation(item.path)
              }
              className="flex items-center gap-4 text-lg cursor-pointer text-gray-300 hover:text-blue-400 transition-all duration-200"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </li>
          ))}

          {/* 🔥 LOGOUT BUTTON */}
          <li
            onClick={handleLogout}
            className="flex items-center gap-4 text-lg cursor-pointer text-gray-300 hover:text-red-400 transition-all duration-200"
          >
            <span className="text-2xl">
              <FaSignOutAlt />
            </span>
            <span className="font-medium">Logout</span>
          </li>
        </ul>

        {/* Post Button */}
        <button
          onClick={handlePost}
          className="mt-8 bg-blue-500 hover:bg-blue-600  cursor-pointer transition-all duration-200 text-white font-semibold w-full py-3 rounded-full flex items-center justify-center gap-2"
        >
          <FaFeather className="text-xl" />
          <span className="hidden md:inline">Post</span>
        </button>
      </div>

      {/* Footer User */}
      <div className="text-sm text-gray-500 pl-2">@username</div>
    </div>
  );
};

export default Sidebar;
