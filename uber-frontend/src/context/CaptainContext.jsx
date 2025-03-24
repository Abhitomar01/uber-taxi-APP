import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null); // Default to an empty object
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  // ✅ Fetch captain data automatically after login
  const fetchCaptainData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      //console.log("🔹 Sending token:", token);

      const response = await axios.get("http://localhost:4000/captain/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });

      console.log("✅ Captain profile fetched:", response.data);
      setCaptain(response.data);
    } catch (err) {
      console.error("❌ Failed to fetch captain data:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fetch data on first load if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCaptainData();
    }
  }, []);

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
    fetchCaptainData
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
