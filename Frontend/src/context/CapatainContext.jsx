import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  

  useEffect(() => {
    const fetchCaptainProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captain/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setCaptain(response.data.captain);
        }
      } catch (error) {
        console.error("Error fetching captain profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptainProfile();
  }, []);

  // const value = {
  //   captain,
  //   setCaptain,
  //   isLoading,
  //   setIsLoading,
  //   error,
  //   setError,
  //   updateCaptain,
  // };

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain, isLoading }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export {CaptainContext};
