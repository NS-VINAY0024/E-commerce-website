import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";

const API_URL = "http://localhost:3000/api/auth"; // Backend URL

const SignUp = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error message on input change
  };

  const validateForm = () => {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phone
    ) {
      setError("All fields are required.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        formData.password
      )
    ) {
      setError(
        "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return false;
    }
    return true;
  };

  const sendOtp = async () => {
    try {
      const response = await fetch(`${API_URL}/sendotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (data.success) {
        setOtpVisible(true); // Show OTP modal
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while sending OTP.");
    }
  };

  const handleOtpVerification = async () => {
    try {
      console.log("Sending OTP for verification:", otp);
      const response = await fetch(`${API_URL}/verifyotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include session cookies
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();
      console.log("Response from server:", data); // Log the server's response

      if (data.success) {
        alert("OTP verified successfully!");
        // Proceed to registration
        const registerResponse = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const registerData = await registerResponse.json();
        if (registerData.success) {
          alert("Registration successful!");
          navigate("/"); // Redirect to home or login page
        } else {
          setError(registerData.message || "Registration failed.");
        }
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
      setError("An error occurred during OTP verification.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      await sendOtp(); // Trigger OTP sending
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
      <h2 className="text-2xl text-purple-600 mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
          required
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
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
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
            {error}
          </div>
        )}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
          Sign Up
        </Button>
      </form>

      <Modal
        isOpen={otpVisible}
        onClose={() => setOtpVisible(false)}
        title="OTP Verification"
      >
        <p className="mb-4">Enter the OTP sent to your email:</p>
        <Input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
            {error}
          </div>
        )}
        <Button onClick={handleOtpVerification} className="w-full">
          Verify
        </Button>
      </Modal>

      <div className="text-center mt-4">
        <p>
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-500 underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
