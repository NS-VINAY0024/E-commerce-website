import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";


const Settings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password changed:", newPassword);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    console.log("Email changed to:", email);
  };

  const handleDisplayNameChange = (e) => {
    e.preventDefault();
    console.log("Display name changed to:", displayName);
  };

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value);
    console.log("Privacy setting changed to:", e.target.value);
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorAuth((prev) => !prev);
    console.log("Two-Factor Authentication toggled:", !twoFactorAuth);
  };

  const handleImageUpload = (e) => {
    setProfileImage(e.target.files[0]);
    setMenuOpen(false); // Close menu after image selection
    console.log("Profile image uploaded:", e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setProfileImage(null); // Remove the image
    setMenuOpen(false); // Close the menu
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg m-5 lg:max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Account Settings
      </h1>

      {/* Profile Image Upload */}
      <div className="mb-8 text-center relative">
        <h2 className="text-xl font-semibold mb-4">Profile Image</h2>

        {profileImage ? (
          <div className="relative w-24 h-24 mx-auto">
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile"
              className="w-full h-full rounded-full object-cover shadow-md"
            />

            {/* Three-dot menu */}
            <div className="absolute top-0 right-0">
              <button onClick={() => setMenuOpen((prev) => !prev)}>
                <FaEllipsisV className="text-gray-500 hover:text-gray-700" />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <ul>
                    <li>
                      <label
                        htmlFor="changeImage"
                        className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                      >
                        Change
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="changeImage"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </li>
                    <li>
                      <button
                        onClick={handleRemoveImage}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Remove
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
        )}
      </div>

      {/* Change Password Section */}
      <form onSubmit={handlePasswordChange} className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full md:w-auto"
        >
          Change Password
        </button>
      </form>

      {/* Change Email Section */}
      <form onSubmit={handleEmailChange} className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Change Email</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter new email"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full md:w-auto"
        >
          Change Email
        </button>
      </form>

      {/* Change Display Name Section */}
      <form onSubmit={handleDisplayNameChange} className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Change Display Name</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Display Name:</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter display name"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full md:w-auto"
        >
          Change Display Name
        </button>
      </form>

      {/* Privacy Settings Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            value="public"
            checked={privacy === "public"}
            onChange={handlePrivacyChange}
            className="mr-2"
          />
          <label className="text-gray-700">Public</label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            value="private"
            checked={privacy === "private"}
            onChange={handlePrivacyChange}
            className="mr-2"
          />
          <label className="text-gray-700">Private</label>
        </div>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Two-Factor Authentication
        </h2>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={twoFactorAuth}
            onChange={handleTwoFactorToggle}
            className="mr-2"
          />
          <span className="text-gray-700">
            Enable Two-Factor Authentication
          </span>
        </label>
      </div>
    </div>
  );
};

export default Settings;
