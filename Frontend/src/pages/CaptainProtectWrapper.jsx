import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CapatainContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  
   if (token === null || token === undefined || !token) {
     return <Navigate to="/captain-login" />;
   }

   axios
     .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
     .then((response) => {
       if (response.status === 200) {
         setCaptain(response.data.captain);
         setIsLoading(false);
       }
     })
     .catch((err) => {
       localStorage.removeItem("token");
       return <Navigate to="/captain-login" />;
     });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
