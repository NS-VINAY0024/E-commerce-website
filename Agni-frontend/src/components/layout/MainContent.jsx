import React, { useState, useEffect, useCallback } from "react";

const MainContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      id: 1,
      image: `${process.env.PUBLIC_URL}/image/1.png`,
      alt: "High-quality Product 1",
    },
    {
      id: 2,
      image: `${process.env.PUBLIC_URL}/image/2.png`,
      alt: "High-quality Product 2",
    },
    {
      id: 3,
      image: `${process.env.PUBLIC_URL}/image/3.png`,
      alt: "High-quality Product 3",
    },
    {
      id: 4,
      image: `${process.env.PUBLIC_URL}/image/4.png`,
      alt: "High-quality Product 4",
    },
    {
      id: 5,
      image: `${process.env.PUBLIC_URL}/image/5.png`,
      alt: "High-quality Product 5",
    },
    {
      id: 6,
      image: `${process.env.PUBLIC_URL}/image/6.png`,
      alt: "High-quality Product 6",
    },
    {
      id: 7,
      image: `${process.env.PUBLIC_URL}/image/7.png`,
      alt: "High-quality Product 7",
    },
    {
      id: 8,
      image: `${process.env.PUBLIC_URL}/image/8.png`,
      alt: "High-quality Product 8",
    },
  ];

  const discounts = [
    "• 20% Discount on all Grocery •",
    "• 30% Discount on purchase of Rs.2000 and above •",
    "• 50% discount on using Amazon Pay Later •",
    "• Flat 10% off on Payments using ICIC credit cards •",
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <main className="w-full bg-gradient-to-r from-[#6a11cb] to-[#2575fc] min-h-screen p-0">
      <div className="grid grid-cols-1 grid-rows-[auto_auto_auto_1fr] text-center text-silver">
        {/* Marquee Section */}
        <div className="bg-yellow-300 h-4 flex items-center overflow-hidden md:h-8">
          <div className="animate-marquee whitespace-nowrap text-black font-bold text-[14px] md:text-[18px] py-2">
            {discounts.map((discount, index) => (
              <span key={index} className="mx-4">
                {discount}
              </span>
            ))}
          </div>
        </div>

        {/* Welcome Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#F3F4F6]">
          Welcome to AGNI Smart Shopping Mart
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-[#D1D5DB] mb-4">
          Browse items, manage your cart, and explore our smart mart map!
          <br />
          Best sellers, Mega sale live now!
          <span className="inline-block bg-red-500 rounded-full w-2 h-2 ml-2"></span>
        </p>

        {/* Carousel Section */}
        <section className="relative w-full h-full overflow-hidden">
          {/* Carousel Wrapper */}
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="min-w-full flex justify-center items-center h-full"
              >
                <div className="card w-full max-w-2xl shadow-xl rounded-lg overflow-hidden h-full transition-shadow duration-300 ease-in-out">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    loading="lazy" // Added lazy loading for better performance
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full z-10 transition-transform duration-200 hover:scale-110"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full z-10 transition-transform duration-200 hover:scale-110"
          >
            &#10095;
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 w-full flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? "bg-purple-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default MainContent;
