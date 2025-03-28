import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import ImageView from "./ImageView"; // Modal component
const ImageCarousel = ( {images}) => {
  const [sizes, setSizes] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [naturalDims, setNaturalDims] = useState({});


  // Compute image size based on container dimensions
  const computeImageSize = (nWidth, nHeight) => {
    const screenWidth = window.innerWidth;
    const containerHeight = screenWidth < 768 ? 350 : 400;
    const containerWidth =
      screenWidth < 768 ? screenWidth - 50 : screenWidth - 80;
    const scaleFactor = Math.min(
      containerWidth / nWidth,
      containerHeight / nHeight
    );
    return {
      width: nWidth * scaleFactor,
      height: nHeight * scaleFactor,
    };
  };

  // Capture image dimensions and compute display size on load
  const handleImageLoad = (e, idx) => {
    const { naturalWidth: nWidth, naturalHeight: nHeight } = e.target;
    setNaturalDims((prev) => ({
      ...prev,
      [idx]: { width: nWidth, height: nHeight },
    }));
    setSizes((prev) => ({ ...prev, [idx]: computeImageSize(nWidth, nHeight) }));
  };

  // Recompute sizes on window resize
  const handleResize = useCallback(() => {
    setSizes((prev) => {
      const newSizes = {};
      for (const idx in naturalDims) {
        const { width, height } = naturalDims[idx];
        newSizes[idx] = computeImageSize(width, height);
      }
      return newSizes;
    });
  }, [naturalDims]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);
  return (
    <>
      <div className="relative w-full max-w-[calc(100%-50px)] lg:max-w-[calc(100%-80px)] h-[350px] md:h-[400px] flex justify-center items-center overflow-hidden">
        <Swiper
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="h-full w-full flex justify-center items-center"
        >
          {images.map((img, index) => {
            const imgStyle = sizes[index]
              ? {
                  width: sizes[index].width,
                  height: sizes[index].height,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }
              : {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "100%",
                  maxHeight: "100%",
                };

            return (
              <SwiperSlide
                key={index}
                className="relative flex justify-center items-center h-full"
              >
                <div className="relative w-full h-full group">
                  <img
                    src={img.link}
                    alt={img.title || `Image ${index + 1}`}
                    onLoad={(e) => handleImageLoad(e, index)}
                    style={imgStyle}
                    className="object-contain transition-all group-hover:bg-black group-hover:bg-opacity-50"
                  />

                  {/* Hover Overlay */}
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => setIsOpen(true)}
                    style={{
                      width: sizes[index]?.width || "100%",
                      height: sizes[index]?.height || "100%",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <span className="text-white text-lg font-semibold transform transition duration-400 group-hover:scale-125">
                      View
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {isOpen && <ImageView images={images} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ImageCarousel;
