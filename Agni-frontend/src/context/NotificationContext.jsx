// context/NotificationContext.js
import React, { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const addNotification = (message, type = "info") => {
    toast[type](message);
  };

  const clearNotification = () => {
    toast.dismiss();
  };

  return (
    <NotificationContext.Provider value={{ addNotification, clearNotification }}>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </NotificationContext.Provider>
  );
};

export { NotificationContext };
