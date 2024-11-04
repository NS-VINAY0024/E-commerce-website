// src/About.jsx

import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#6a11cb] to-[#2575fc] p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        Welcome to Agni Shopping! We are committed to providing the best online
        shopping experience for our customers. Our mission is to bring you a
        wide range of products at competitive prices, coupled with excellent
        customer service.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
      <p className="mb-4">
        Our dedicated team is passionate about helping you find what you need.
        We work tirelessly to ensure that your shopping experience is smooth and
        enjoyable.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
      <p>
        At Agni Shopping, we value integrity, customer satisfaction, and
        innovation. We strive to create a platform that not only meets but
        exceeds our customers' expectations.
      </p>
    </div>
  );
};

export default About;
