import React, { useContext } from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { Menus } from "../utils/util.js";
import DesktopMenu from "./DesktopMenu";
import MobMenu from "./MobMenu";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../features/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { AuthContext } from "../../../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  // Use authentication status from AuthContext
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);

  const handleLogout = async () => {
    try {
      // Call your backend logout route to clear session cookie.
      const res = await axios.get("http://localhost:3000/api/ieeegcetsb/user/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Logged out successfully");
        dispatch(setUser(null));
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // Navigate to login if not authenticated.
  const handleLogin = () => {
    navigate("/login");
  };

  const handleNewEvent = () => {
    navigate("/event/upload");
  };

  return (
    <div className="max-w-full relative z-[9999]">
      <header className="h-16 mx-auto text-[15px] fixed inset-0 flex-center bg-[#ffffffb9] backdrop-blur-sm">
        <nav className="px-3.5 flex-center-between w-full max-w-full mx-[10px]">
          <div className="flex-center gap-x-3 relative">
            <div className="flex-center">
              <Logo />
            </div>
          </div>
          <div className="gap-x-1 lg:flex-center">
            <ul className="gap-x-2 lg:flex-center hidden">
              {Menus.map((menu) => (
                <DesktopMenu menu={menu} key={menu.name} />
              ))}
            </ul>
            <div className="flex-center gap-x-5">
              {(isAuthenticated && user)&&(
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#00629B] text-white px-4 py-1.5 rounded-lg shadow-md hover:bg-[#00629be2] transition-all"
                  onClick={handleNewEvent}
                >
                  New Event
                </motion.button>
              )}
              {(isAuthenticated && user)? (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#00629B] text-white px-4 py-1.5 rounded-lg shadow-md hover:bg-[#00629be2] transition-all"
                  onClick={handleLogout}
                >
                  Logout
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#00629B] text-white px-4 py-1.5 rounded-lg shadow-md hover:bg-[#00629be2] transition-all"
                  onClick={handleLogin}
                >
                  Login
                </motion.button>
              )}
              <div className="lg:hidden">
                <MobMenu Menus={Menus} />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
