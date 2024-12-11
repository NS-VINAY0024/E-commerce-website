import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#6a11cb] to-[#2575fc] p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        Welcome to Agni Shopping! We are committed to providing the best online
        shopping experience. Our goal is to deliver quality products at
        affordable prices with exceptional customer service.
      </p>

      {/* Our Values Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Customer First:</strong> We prioritize customer satisfaction
            in every decision we make.
          </li>
          <li>
            <strong>Integrity:</strong> Honesty and transparency are at the
            heart of everything we do.
          </li>
          <li>
            <strong>Quality:</strong> Delivering top-notch products and services
            is our primary focus.
          </li>
          <li>
            <strong>Innovation:</strong> Constantly striving to improve and
            bring new solutions for our customers.
          </li>
        </ul>
      </div>

      {/* Our Team Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <p className="mb-4">
          Meet the incredible team behind Agni Shopping. We are dedicated to
          ensuring you have the best experience possible!
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 p-10 w-9/12">
          <img
            src={`${process.env.PUBLIC_URL}/image/Vinay.jpg`}
            alt="Team Member 1"
            className="w-full object-cover rounded-full h-64 p-10"
          />
          <img
            src={`${process.env.PUBLIC_URL}/image/Prajwal.jpg`}
            alt="Team Member 2"
            className="w-full object-cover rounded-full h-64 p-10"
          />
          <img
            src={`${process.env.PUBLIC_URL}/image/Poorna.jpg`}
            alt="Team Member 3"
            className="w-full object-cover rounded-full h-64 p-10"
          />
          <img
            src={`${process.env.PUBLIC_URL}/image/BALA.jpg`}
            alt="Team Member 4"
            className="w-full object-cover rounded-full h-64 p-10"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
