import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/partials/Navbar_components/Navbar";
import Footer from "./components/partials/Home_components/Footer_Section/Footer";
import scrollToTop from "./scrollToTop";

const Layout = () => {
  scrollToTop();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet key={location.pathname + location.search} /> {/* Renders the current route’s component */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
