import React, { useEffect } from "react";
import MainContent from "../../components/layout/MainContent";
import useAuthStore from "../../Store/authstore";
import HomePage from "../HomePage";

const Home = () => {
  const { user, isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!user && isAuthenticated) {
      checkAuth();
    }
  }, [user, isAuthenticated, checkAuth]);

  return (
    <div>
      <MainContent userName={user?.name || "Shopper"} />
      <HomePage />
    </div>
  );
};

export default Home;
