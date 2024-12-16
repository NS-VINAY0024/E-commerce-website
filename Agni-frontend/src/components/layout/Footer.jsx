import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Dynamically get the current year

  return (
    <footer className="bg-gradient-to-br from-[#6a11cb] to-[#2575fc] p-[10px] grid grid-cols-3 grid-rows-[0.5fr_0.1fr] items-center shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col items-start">
        <img
          src={`${process.env.PUBLIC_URL}/image/agni logo.png`}
          alt="AGNI Logo" // More descriptive alt text
          className="max-w-[60px] sm:max-w-[70px] md:max-w-[80px]"
        />
      </div>

      <div className="social-media text-center flex justify-self-center gap-5 items-center space-x-2">
        <a
          href="https://x.com/bitsince1979?t=9gBJJEQ8eF4AVgmKeC-OfQ&s=09&mx=2"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <img
            src={`${process.env.PUBLIC_URL}/image/twitter.png`}
            alt="Twitter Icon" // More descriptive alt text
            className="max-w-[25px] sm:max-w-[30px] md:max-w-[35px]"
          />
        </a>
        <a
          href="https://www.instagram.com/amorous__camera/?igsh=MXZtd2Fwa2djYmkybA%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <img
            src={`${process.env.PUBLIC_URL}/image/instagram.png`}
            alt="Instagram Icon" // More descriptive alt text
            className="max-w-[25px] sm:max-w-[30px] md:max-w-[35px]"
          />
        </a>
        <a
          href="https://www.youtube.com/@prajwalhr7012?si=FRQyHRACE_IDWeta"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <img
            src={`${process.env.PUBLIC_URL}/image/youtube.png`}
            alt="YouTube Icon" // More descriptive alt text
            className="max-w-[25px] sm:max-w-[30px] md:max-w-[35px]"
          />
        </a>
      </div>

      <div className="flex flex-col items-end mr-[10px]">
        <a
          href="/about" // Update with actual link
          className="text-white no-underline my-[5px] text-[14px] sm:text-[16px] md:text-[18px] font-bold hover:text-[#6a11cb]"
        >
          About Us
        </a>
        <a
          href="/contact" // Update with actual link
          className="text-white no-underline my-[5px] text-[14px] sm:text-[16px] md:text-[18px] font-bold hover:text-[#6a11cb]"
        >
          Contact Us
        </a>
      </div>

      <p className="copyright col-span-full text-center text-[#d3d3d3] text-sm sm:text-base">
        &copy; {currentYear} Smart Shopping. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
