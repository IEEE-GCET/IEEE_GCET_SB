import React from "react";
import Hero2 from "./Hero_Section/Hero2";
import About from "./About_Section/About";
import Slogan from "./Slogan_Section/Solgan";
import Footer from "./Footer_Section/Footer";
import Testimonials from "./Testimonials_Section/Testimonials";

const Home = () => {
  return (
    <>
      <Hero2 />
      <About />
      <Slogan />
      <Testimonials/> 

      {/* <Services /> */}
      {/*  <Projects /> */}
      {/*  <Contact /> */}
    </>
  );
};

export default Home;
