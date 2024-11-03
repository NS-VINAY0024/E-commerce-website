import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // API call logic here
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, login };
};
