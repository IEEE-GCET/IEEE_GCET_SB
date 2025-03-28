import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

const Testimonials = () => {
  const testimonials = [
    {
      // imgSrc: 'https://via.placeholder.com/100',
      name: 'John Doe',
      role: 'CEO',
      company: 'Company X',
      feedback: 'This service helped us streamline our processes and increased efficiency. Highly recommend!',
    },
    {
      // imgSrc: 'https://via.placeholder.com/100',
      name: 'Jane Smith',
      role: 'CTO',
      company: 'Tech Co.',
      feedback: 'Amazing team! Their support and innovation have helped us grow significantly.',
    },
    {
      // imgSrc: 'https://via.placeholder.com/100',
      name: 'Michael Johnson',
      role: 'Founder',
      company: 'StartUp Y',
      feedback: 'Incredible experience working with this company. They truly care about our success.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to move to the next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Function to move to the previous testimonial
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Use effect to set up automatic carousel transition
  useEffect(() => {
    const intervalId = setInterval(nextTestimonial, 3000); // Change testimonial every 3 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-12 text-[#00629B] bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Student Members Say</h2>

        <div className="relative z-[1]">
          {/* Carousel container */}
          <motion.div
            className="carousel-container flex justify-center items-center"
            key={currentIndex} // To trigger re-render on index change
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TestimonialCard
              imgSrc={testimonials[currentIndex].imgSrc}
              name={testimonials[currentIndex].name}
              role={testimonials[currentIndex].role}
              company={testimonials[currentIndex].company}
              feedback={testimonials[currentIndex].feedback}
            />
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial} // Navigate to the previous testimonial
            className="sm:absolute hidden sm:flex left-0 top-1/2 transform -translate-y-1/2 bg-[#00629B] hover:bg-[#00629bdf] text-white p-3 rounded"
          >
            &lt;
          </button>
          <button
            onClick={nextTestimonial} // Navigate to the next testimonial
            className="sm:absolute hidden sm:flex right-0 top-1/2 transform -translate-y-1/2 bg-[#00629B] hover:bg-[#00629bdf] text-white p-3 rounded"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
