import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    setLoginStatus(userLoggedIn ? "Logged in" : "Login");
  }, [userLoggedIn]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
    <header className="grid grid-cols-2 items-center bg-gradient-to-r from-[#6a11cb] to-[#2575fc] p-3 sm:p-4 md:p-5 shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
      <div className="left-section flex items-center">
        <Link to="." className="mr-5">
          <img
            src={`${process.env.PUBLIC_URL}/image/agni logo.png`}
            alt="Smart Shopping Logo"
            className="max-w-[40px] sm:max-w-[50px] md:max-w-[60px]"
          />
        </Link>
        <nav>
          <ul className="flex list-none m-0 p-0">
            <li className="mr-5">
              <Link
                to="/"
                className="no-underline text-[#F3F4F6] text-[14px] sm:text-[18px] font-bold hover:text-[#2575fc]"
              >
                Home
              </Link>
            </li>
            <li className="mr-5">
              <Link
                to="/items"
                className="no-underline text-[#F3F4F6] text-[14px] sm:text-[18px] font-bold hover:text-[#2575fc]"
              >
                Items
              </Link>
            </li>
            <li>
              <Link
                to="/map"
                className="no-underline text-[#F3F4F6] text-[14px] sm:text-[18px] font-bold hover:text-[#2575fc]"
              >
                Map
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Rest of the header code remains the same */}
      <div className="right-section flex justify-end items-center">
        <div className="cart mr-5">
          <Link to="/cart" title="Shopping Cart">
            <img
              src={`${process.env.PUBLIC_URL}/image/cart.png`}
              alt="Cart"
              className="w-[14px] sm:w-[30px]"
            />
          </Link>
        </div>

        <div
          id="hamburgerMenu"
          className="hamburger-menu relative cursor-pointer"
          onClick={toggleDropdown}
        >
          <div className="text-[14px] sm:text-[30px] text-[#F3F4F6]">
            &#9776;
          </div>
          {isDropdownOpen && (
            <div
              id="dropdownMenu"
              className="dropdown-menu absolute right-1 mt-[30px] bg-[rgba(106,17,203,0.4)] shadow-[0_4px_10px_rgba(0,0,0,0.1)] rounded-[5px] overflow-hidden max-w-[350px] max-h-[500vh] z-10"
            >
              <ul className="list-none p-0 m-5 ">
                <li className="px-5 py-[15px]">
                  <Link
                    to="/profile"
                    className="text-[#fafafa] text-[16px] sm:text-[18px] no-underline relative hover:text-[#696969] hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-[2px] hover:after:left-0 hover:after:bottom-0 hover:after:bg-[#d3d3d3] hover:after:transform hover:after:scale-x-100 hover:after:transition-transform"
                  >
                    Profile
                  </Link>
                </li>
                <li className="px-5 py-[15px]">
                  <Link
                    to="/settings"
                    className="text-[#fafafa] text-[16px] sm:text-[18px] no-underline relative hover:text-[#696969] hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-[2px] hover:after:left-0 hover:after:bottom-0 hover:after:bg-[#d3d3d3] hover:after:transform hover:after:scale-x-100 hover:after:transition-transform"
                  >
                    Settings
                  </Link>
                </li>
                <li className="px-5 py-[15px]">
                  <Link
                    to="/login"
                    className="text-[#fafafa] text-[16px] sm:text-[18px] no-underline relative hover:text-[#696969] hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-[2px] hover:after:left-0 hover:after:bottom-0 hover:after:bg-[#d3d3d3] hover:after:transform hover:after:scale-x-100 hover:after:transition-transform"
                  >
                    {loginStatus}
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
