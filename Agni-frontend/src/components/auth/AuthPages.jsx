import React, { useState } from "react";
import Login from "./login";
import SignUp from "./signup";

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignUp = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      {isLogin ? (
        <Login onSwitchToSignUp={switchToSignUp} />
      ) : (
        <SignUp onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default AuthPages;
