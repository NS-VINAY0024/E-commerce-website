import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Button from "../ui/Button"; // Import your Button component
import Input from "../ui/Input"; // Import your Input component
import Modal from "../ui/Modal"; // Import your Modal component

const AuthPages = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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
        setLoggedIn(true);
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
      navigate("/"); // Redirect using navigate
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-2xl text-purple-600 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
          />

          <div className="relative mb-6">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
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
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                required
              />
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
              />
            </>
          )}

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={20} />
            ) : null}
            {isLogin ? "Login" : "Sign Up"}
          </Button>

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
      <Modal
        isOpen={otpVisible}
        onClose={() => setOtpVisible(false)}
        title="OTP Verification"
      >
        <p className="mb-4">Please enter the OTP sent to your phone.</p>
        <Input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
        <Button onClick={handleOtpVerification} className="w-full">
          Verify
        </Button>
      </Modal>
    </div>
  );
};

export default AuthPages;
