import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function MobMenu({ Menus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
  };

  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
    },
    exit: {
      height: 0,
      overflow: "hidden",
    },
  };

  return (
    <div>
      <div className="realtive h-auto">
        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden z-[999]  relative text-white bg-[#00629B] p-2 rounded-md shadow-md"
          onClick={toggleDrawer}
        >
          {isOpen ? (
            <X className="w-[17px] h-[17px]" />
          ) : (
            <Menu className="w-[17px] h-[17px]" />
          )}
        </button>

        {/* Overlay to prevent background elements from interfering */}
        {/* Overlay to prevent background elements from interfering */}
        {isOpen && (
          <div
            className="absolute top-0 left-0 w-full h-[100vh] bg-black/70 z-[9999]"
            onClick={toggleDrawer}
          ></div>
        )}

        {/* Mobile Navigation Drawer */}
        <motion.div
          className="fixed top-0 h-[100vh] left-0 w-1/2  bg-[#00629B] backdrop-blur-lg text-white p-6 pb-20 z-[9999] overflow-y-auto ease-linear   duration-300"
          initial={{ x: "200%" }}
          animate={{ x: isOpen ? "100%" : "200%" }}
        >
          <div className="flex justify-end">
            <button className="p-2" onClick={toggleDrawer}>
              <X size={28} />
            </button>
          </div>

          <ul className="mt-5">
            {Menus.map(({ name, path, subMenu }, i) => {
              const isClicked = clicked === i;
              const hasSubMenu = subMenu?.length;

              return (
                <li key={name} className="border-t border-white/20">
                  <span
                    className="flex items-center justify-between p-3 hover:bg-white/10 rounded-md cursor-pointer"
                    onClick={() => setClicked(isClicked ? null : i)}
                  >
                    <NavLink
                      to={path}
                      onClick={toggleDrawer}
                      className="pr-7 py-2"
                    >
                      {name}
                    </NavLink>
                    {hasSubMenu && (
                      <ChevronDown
                        className={`ml-auto transition-transform ${
                          isClicked ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </span>

                  {hasSubMenu && (
                    <motion.ul
                      initial="exit"
                      animate={isClicked ? "enter" : "exit"}
                      variants={subMenuDrawer}
                      className="ml-5"
                    >
                      {subMenu.map(({ name, path, icon: Icon }) => (
                        <NavLink
                          to={path}
                          key={name}
                          onClick={toggleDrawer}
                          className="flex p-2 items-center hover:bg-white/10 rounded-md gap-x-3 cursor-pointer"
                        >
                          <Icon size={17} />
                          {name}
                        </NavLink>
                      ))}
                    </motion.ul>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
