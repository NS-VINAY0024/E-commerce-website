import React, { useState, useEffect } from "react";
import { Menu, X, Home, Settings, User, LogIn } from "lucide-react";
import { useAuthStore } from "../../Authentication/store/authstore";

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
  const { user, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isAuthenticated = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleLogout = () => {
    logout(); // Call the Zustand store's logout method
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
      <header className="grid grid-cols-[2fr_1fr] items-center bg-gradient-to-br from-[#6a11cb] to-[#2575fc] p-3 sm:p-4 md:p-5 shadow-md">
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
                <CartIcon className="w-[18px] sm:w-[24px] text-white hover:text-[#6a11cb]" />
                {cartItems.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {cartItems.length}
                  </div>
                )}
              </div>
            </a>
          </div>

          <button
            onClick={toggleSidebar}
            className="text-white ml-4 hover:text-[#6a11cb]"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-40"
            onClick={toggleSidebar}
          />

          {/* Sidebar Content */}
          <div
            className={`
              fixed top-0 right-0 h-full w-64 bg-white shadow-lg 
              transform transition-transform duration-300 ease-in-out z-50
              ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
            `}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <a href="/">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/agni logo.png`}
                    alt="Smart Shopping Logo"
                    className="w-20"
                  />
                </a>
                <button onClick={toggleSidebar} className="text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-4">
                <a
                  href="/profile"
                  className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-colors"
                >
                  <User size={20} />
                  <span>Profile</span>
                </a>

                <a
                  href="/settings"
                  className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-colors"
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </a>
                <a
                  href={isAuthenticated ? "/logout" : "/login"}
                  onClick={(e) => {
                    if (isAuthenticated) {
                      e.preventDefault(); // Prevent navigation to "/logout"
                      handleLogout(); // Call the logout function
                    }
                  }}
                  className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-colors"
                >
                  <LogIn size={20} />
                  <span>{isAuthenticated ? "Logout" : "Login"}</span>
                </a>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
