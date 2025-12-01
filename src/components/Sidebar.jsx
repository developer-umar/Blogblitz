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
import { motion } from "framer-motion";

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

       navigate("/post")
        //  After navigating, focus Search bar
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
      {/* Enhanced Logo - Same premium metallic gold from Navbar, scaled for sidebar */}
      <div className="mb-6">
        <div
          onClick={() => navigate("/post")}
          className="flex items-center space-x-2 cursor-pointer group/logo p-2"
        >
          {/* Zabardast Golden Metallic Hashtag - Scaled down for sidebar, responsive */}
          <motion.div
            className="relative flex items-center justify-center cursor-default"
            initial={{ scale: 0.95, rotate: -2 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Core Hashtag - Hyper-refined gradient with metallic sheen */}
            <span className=" mb-6 text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 drop-shadow-xl relative z-20">
              #
            </span>
            {/* Cinematic Primary Shine - Animated diagonal highlight with glow pulse */}
            <motion.div
              className="absolute top-0.5 left-1/3 w-2/3 h-0.5 bg-gradient-to-r from-yellow-200 via-white to-yellow-200 opacity-80 rounded-sm shadow-md"
              initial={{ width: 0 }}
              animate={{ width: "66.67%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
              whileHover={{ opacity: 100, scaleX: 1.1 }}
            />
            {/* Elite Secondary Bevel - Top-left emboss with micro-shimmer */}
            <div className="absolute top-1 left-0.5 w-1/2 h-1 bg-gradient-to-r from-white/60 to-transparent opacity-70 rounded-sm"></div>
            {/* Engraved Base Shadow - Subtle bottom-right for tactile depth */}
            <div className="absolute bottom-0.5 right-0.5 w-full h-0.5 bg-gradient-to-l from-amber-900/60 to-transparent opacity-80 blur-xs"></div>
            {/* Radiant Outer Halo - Breathing glow with hover intensification */}
            <motion.div
              className="absolute inset-0 shadow-[0_0_20px_rgba(255,215,0,0.4),inset_0_0_15px_rgba(255,215,0,0.15)] blur-lg rounded-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ opacity: 1, scale: 1.1 }}
            />
            {/* Textured Inner Overlay - Luxe gradient for forged-metal illusion */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-700/40 via-transparent to-amber-900/40 rounded-sm backdrop-blur-xs"></div>
          </motion.div>
          {/* Masterclass BlockBlitz Text - Kinetic typography, gold foil effect, pro kerning & letter-spacing, responsive sizing */}
          <motion.div
            className=" mb-6  text-lg md:text-xl font-black tracking-[-0.03em] bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-xl relative overflow-hidden"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -1 }}
          >
            BlockBlitz
            {/* Foil Shine Sweep - Animated light sweep across text on load/hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0"
              initial={{ x: -100 }}
              animate={{ x: [-100, 200] }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
              whileHover={{ opacity: 50, transition: { duration: 0.8 } }}
            />
            {/* Layered Depth Shadows - Multi-pass for cinematic volume */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/30 to-amber-800/50 -skew-x-2 opacity-90 blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-transparent opacity-70"></div>
          </motion.div>
        </div>

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
            className="flex items-center gap-4 text-lg cursor-pointer text-gray-300 hover:text-blue-400 transition-all duration-200"
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