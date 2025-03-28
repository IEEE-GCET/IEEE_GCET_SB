import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollToTop = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]); // Runs before the new page is painted

  return null;
};

export default scrollToTop;
