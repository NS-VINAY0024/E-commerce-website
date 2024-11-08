import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", { name, email });
  };

  return (
    <div className="profile-container max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 md:text-3xl">
        Your Profile
      </h1>
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label className="text-gray-600 font-medium mb-1 md:w-1/3">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Update your name"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-2/3"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <label className="text-gray-600 font-medium mb-1 md:w-1/3">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Update your email"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-2/3"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-1/2 md:mx-auto lg:w-1/3"
          >
            Update Profile
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-500">No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
