import React, { useEffect, useState } from "react";
import MainContent from "../../components/layout/MainContent";
import CategorySection from "../../components/layout/components/categories";
import { useAuthStore } from "../../Authentication/store/authstore";
const Home = () => {
  const {user, isAuthenticated, checkAuth } = useAuthStore();
  useEffect(() => {
    if (!user && isAuthenticated) {
      checkAuth(); // Ensure we have the latest user data
    }
  }, [user, isAuthenticated, checkAuth]);

  return (
    <div>
      <MainContent userName={user.name}/>
      <CategorySection />
    </div>
  );
};

export default Home;
