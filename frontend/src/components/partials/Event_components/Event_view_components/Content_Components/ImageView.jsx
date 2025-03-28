import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Keyboard, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const ImageView = ({ images, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [sizes, setSizes] = useState({ width: "auto", height: "auto" });
  const [naturalDims, setNaturalDims] = useState({ width: null, height: null });
  const swiperRef = useRef(null);

  const computeImageSize = (nWidth, nHeight) => {
    const containerWidth = 0.8 * window.innerWidth;
    const containerHeight = 0.8 * (window.innerHeight - 64);
    const scaleFactor = Math.min(containerWidth / nWidth, containerHeight / nHeight);
    return { width: nWidth * scaleFactor, height: nHeight * scaleFactor };
  };

  const handleImageLoad = (e) => {
    const nWidth = e.target.naturalWidth;
    const nHeight = e.target.naturalHeight;
    setNaturalDims({ width: nWidth, height: nHeight });
    setSizes(computeImageSize(nWidth, nHeight));
  };

  useEffect(() => {
    const handleResize = () => {
      if (naturalDims.width && naturalDims.height) {
        setSizes(computeImageSize(naturalDims.width, naturalDims.height));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [naturalDims]);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const swiperSettings = {
    modules: [Autoplay, Pagination, Keyboard, Navigation],
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { clickable: true },
    keyboard: { enabled: true, onlyInViewport: false },
    initialSlide: initialIndex,
    onSlideChange: (swiper) => setCurrentIndex(swiper.realIndex),
    onSwiper: (swiper) => {
      swiperRef.current = swiper;
      swiper.el.addEventListener("mouseenter", () => swiper.autoplay.stop());
      swiper.el.addEventListener("mouseleave", () => swiper.autoplay.start());
    },
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center cursor-pointer"
      style={{ top: "64px", height: "calc(100vh - 64px)" }}
    >
      <div className="relative bg-white rounded-md shadow-lg flex flex-col items-center justify-center lg:max-w-[60vw] md:max-w-[70vw] sm:max-w-[80vw] max-w-[85vw] max-h-[80vh] p-4 cursor-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2  hover:scale-110 transition cursor-pointer text-gray-600"
        >
          <FaTimes size={24} />
        </button>
        <button
          onClick={handlePrev}
          className="custom-prev absolute top-1/2 left-2 z-10 hidden md:flex items-center justify-center bg-[#00629b] p-3 rounded-md shadow-lg hover:bg-[#174068] transition cursor-pointer"
        >
          <FaArrowLeft size={20} className="text-white" />
        </button>
        <button
          onClick={handleNext}
          className="custom-next absolute top-1/2 right-2 z-10 hidden md:flex items-center justify-center bg-[#00629b] p-3 rounded-md shadow-lg hover:bg-[#174068] transition cursor-pointer"
        >
          <FaArrowRight size={20} className="text-white" />
        </button>
        <Swiper {...swiperSettings} className="h-full w-[90%]">
          {images.map((img, index) => (
            <SwiperSlide key={index} className="relative group h-full">
              <div className="flex items-center justify-center h-full w-full">
                <img
                  src={img.link}
                  alt={img.title || `Image ${index + 1}`}
                  onLoad={handleImageLoad}
                  style={
                    sizes.width !== "auto" ? { width: sizes.width, height: sizes.height } : {}
                  }
                  className="object-contain rounded-md transition-all"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 flex items-center justify-center" style={{ height: "15%" }}>
                <p className="text-white text-sm">{img.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageView;
