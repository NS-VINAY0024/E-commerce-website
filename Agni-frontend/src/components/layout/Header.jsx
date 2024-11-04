import React, { useState, useEffect } from "react";

const CartIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 4h2l2.5 12h10l2.5-8H8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="20" r="1" fill="currentColor" />
    <circle cx="18" cy="20" r="1" fill="currentColor" />
  </svg>
);

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle sidebar menu
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle click outside of the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.getElementById("hamburgerMenu");
      const dropdown = document.getElementById("dropdownMenu");

      if (menu && dropdown && !menu.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="grid grid-cols-2 items-center bg-gradient-to-r from-[#6a11cb] to-[#2575fc] p-3 sm:p-4 md:p-5 shadow-md">
        <div className="left-section flex items-center">
          <a href="/" className="mr-5">
            <img
              src={`${process.env.PUBLIC_URL}/image/agni logo.png`}
              alt="Smart Shopping Logo"
              className="max-w-[40px] sm:max-w-[50px] md:max-w-[60px]"
            />
          </a>
          <nav>
            <ul className="flex list-none m-0 p-0">
              <li className="mr-5">
                <a
                  href="/"
                  className="no-underline text-[#F3F4F6] text-[14px] sm:text-[18px] font-bold hover:text-[#2575fc]"
                >
                  Home
                </a>
              </li>
              <li className="mr-5">
                <a
                  href="*"
                  className="no-underline text-[#F3F4F6] text-[14px] sm:text-[18px] font-bold hover:text-[#2575fc]"
                >
                  Items
                </a>
              </li>
              <li>
                <a
                  href="/map"
                  className="no-underline text-[#F3F4F6] text-[14px] sm:text-[18px] font-bold hover:text-[#2575fc]"
                >
                  Map
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="right-section flex justify-end items-center">
          <div className="cart relative mr-5">
            <a
              href="/cart"
              className="relative inline-block"
              aria-label="View Cart"
            >
              <div className="relative">
                <CartIcon className="w-8 h-8 text-white" />
                {cartItems.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {cartItems.length}
                  </div>
                )}
              </div>
            </a>
          </div>

          <div
            id="hamburgerMenu"
            className="hamburger-menu relative cursor-pointer"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <div className="text-[14px] sm:text-[30px] text-[#F3F4F6]">
              &#9776;
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 flex z-30">
          <div
            className={`sidebar bg-white w-64 h-full shadow-lg z-20 transition-transform transform ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            } right-0`}
          >
            <div className="flex items-center p-4 border-b">
              <a href="/">
                <img
                  src={`${process.env.PUBLIC_URL}/image/agni logo.png`}
                  alt="Smart Shopping Logo"
                  className="w-20"
                />
              </a>
            </div>
            <ul className="list-none p-5">
              <li className="mb-5">
                <a
                  href="/profile"
                  className="text-gray-700 hover:text-[#2575fc]"
                >
                  Profile
                </a>
              </li>
              <li className="mb-5">
                <a
                  href="/settings"
                  className="text-gray-700 hover:text-[#2575fc]"
                >
                  Settings
                </a>
              </li>
              <li className="mb-5">
                <a href="/login" className="text-gray-700 hover:text-[#2575fc]">
                  {userLoggedIn ? "Logout" : "Login"}
                </a>
              </li>
            </ul>
          </div>
          <div
            className="overlay fixed inset-0 bg-black opacity-50 z-10"
            onClick={toggleSidebar}
          />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`main-content ${
          isSidebarOpen ? "blur-sm" : ""
        } transition-all`}
      >
        <div className="marquee" />
        <div className="carousel" />
      </div>
    </>
  );
};

export default Header;
