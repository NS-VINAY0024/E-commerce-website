import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // New state for login status

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      setError("Please fill in all required fields");
      return false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (!isLogin && formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (!isLogin) {
        // Simulate sending OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("OTP sent to:", formData.phone);
        console.log("Generated OTP (for testing):", otp);
        sessionStorage.setItem("otp", otp);
        setGeneratedOtp(otp);
        setOtpVisible(true);
      } else {
        // Simulate login success
        console.log("Logged in:", formData);
        setLoggedIn(true); // Set loggedIn to true
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = () => {
    if (otp === sessionStorage.getItem("otp")) {
      alert("OTP Verified! Redirecting to homepage...");
      // Redirect to the homepage after successful OTP verification
      window.location.href = "homepage.html"; // Change to your homepage URL
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // If logged in, render the homepage content instead
  if (loggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
        <h1 className="text-4xl text-white">Welcome to the Homepage!</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-2xl text-purple-600 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative mb-6">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              required
              className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-600 outline-none"
            />
          </div>

          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-600 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {!isLogin && (
            <>
              <div className="relative mb-6">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-600 outline-none"
                />
              </div>
              <div className="relative mb-6">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  required
                  className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-600 outline-none"
                />
              </div>
            </>
          )}

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white py-2 rounded w-full transition duration-300 hover:bg-blue-500"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={20} />
            ) : null}
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <p className="mt-4 text-gray-700">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </form>
      </div>

      {/* OTP Verification Popup */}
      {otpVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-lg text-center w-80 relative">
            <span
              className="absolute top-2 right-3 text-2xl cursor-pointer"
              onClick={() => setOtpVisible(false)}
            >
              &times;
            </span>
            <h2 className="text-xl mb-4">OTP Verification</h2>
            <p className="mb-4">Please enter the OTP sent to your phone.</p>
            <div className="relative mb-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-600 outline-none"
              />
            </div>
            <button
              onClick={handleOtpVerification}
              className="bg-purple-600 text-white py-2 rounded w-full transition duration-300 hover:bg-blue-500"
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPages;
