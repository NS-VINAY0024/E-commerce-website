// src/Contact.jsx

import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    if (formData.name && formData.email && formData.message) {
      setSuccess(true);
      setError("");
    } else {
      setError("Please fill in all fields.");
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#6a11cb] to-[#2575fc] p-8 text-black">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      {success && (
        <p className="mb-4 text-green-400">
          Your message has been sent successfully!
        </p>
      )}
      {error && <p className="mb-4 text-red-400">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-600 outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-600 outline-none"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-600 outline-none"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-600 outline-none"
          rows="5"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded w-full transition duration-300 hover:bg-blue-500"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
