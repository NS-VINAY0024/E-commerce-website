import React, { useEffect, useState } from "react";
import MainContent from "../../components/layout/MainContent";
import CategorySection from "../../components/layout/components/categories";
const Home = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const response = await fetch("http://localhost:3000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUserName(data.user.username);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div>
      <MainContent userName={userName} />
      <CategorySection />
    </div>
  );
};

export default Home;
