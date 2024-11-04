import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../../context/AuthContext'; // Import AuthContext

const Profile = () => {
  const { user } = useContext(AuthContext); // Access user from context
  const [name, setName] = useState(user ? user.name : ""); // Set initial name
  const [email, setEmail] = useState(user ? user.email : ""); // Set initial email

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]); // Update states when user data changes

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically call an API to save the updated user info
    console.log("Updated Profile:", { name, email });
  };

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      {user ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Update your name"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Update your email"
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
