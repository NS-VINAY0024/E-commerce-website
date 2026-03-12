import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Menu,
  X,
  User,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../../Store/authstore";
import { useCartStore } from "../../Store/useCartStore";

const Header = () => {
  const { user, logout } = useAuthStore();
  const isAdmin = user?.role === "admin";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cart, getCartItems } = useCartStore();

  // Toggle sidebar menu
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [getCartItems, user]);

  return (
    <>
      <header className="grid grid-cols-[2fr_1fr] items-center bg-gradient-to-br from-[#6a11cb] to-[#2575fc] p-3 sm:p-4 md:p-5 shadow-md">
        <div className="left-section flex items-center">
          <Link to="/" className="mr-5">
            <img
              src="/agni logo.png"
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

        <div className="right-section flex justify-end items-center">
          <div className="cart relative mr-5">
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-[#F3F4F6] hover:text-[#2575fc] transition duration-300 
							ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-[#2575fc]"
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span
                    className="absolute -top-2 -left-2 bg-[#6a11cb] text-[#F3F4F6] rounded-full px-2 py-0.5 
									text-xs group-hover:bg-[#9a11cb] transition duration-300 ease-in-out"
                  >
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
          </div>
          {isAdmin && (
            <Link
              className="bg-[#6a11cb] hover:bg-[#9a11cb] text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
              to={"/secret-dashboard"}
            >
              <Lock className="inline-block mr-1" size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}
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
                <Link to="/">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/agni logo.png`}
                    alt="Smart Shopping Logo"
                    className="w-20"
                  />
                </Link>
                <button onClick={toggleSidebar} className="text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-4">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={toggleSidebar}
                      className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-colors"
                    >
                      <User size={20} />
                      <span>Profile</span>
                    </Link>

                    <Link
                      to="/settings"
                      onClick={toggleSidebar}
                      className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 p-2 rounded-md transition-colors"
                    >
                      <Settings size={20} />
                      <span>Settings</span>
                    </Link>
                  </>
                ) : null}
                {user ? (
                  <button
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out"
                    onClick={async () => {
                      await logout();
                      toggleSidebar();
                    }}
                  >
                    <LogOut size={18} />
                    <span className="hidden sm:inline ml-2">Log Out</span>
                  </button>
                ) : (
                  <>
                    <Link
                      to={"/signup"}
                      onClick={toggleSidebar}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out"
                    >
                      <UserPlus className="mr-2" size={18} />
                      Sign Up
                    </Link>
                    <Link
                      to={"/login"}
                      onClick={toggleSidebar}
                      className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out"
                    >
                      <LogIn className="mr-2" size={18} />
                      Login
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
