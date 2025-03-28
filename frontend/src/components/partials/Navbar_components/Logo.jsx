import React from "react";
import ieeelogo from "./ieeelogo.png";
import { NavLink } from "react-router-dom";
const Logo = () => {
  return (
    <NavLink to="/" className="  rounded-md  ">
          <img src={ieeelogo} alt="" className="w-24" />
     </NavLink>
  );
};

export default Logo;
