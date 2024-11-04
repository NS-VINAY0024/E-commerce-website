import React, { useState } from "react";

const Settings = () => {
  // State variables for user settings
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [privacy, setPrivacy] = useState("public"); // Default privacy setting

  const handlePasswordChange = (e) => {
    e.preventDefault();
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

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
    </div>
  );
};

export default Settings;
