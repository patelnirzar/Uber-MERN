import React, { useEffect } from 'react'
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';

function UserLogout() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  // console.log(`Bearer ${token}`);
  console.log("logout")

  useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.removeItem("token");
            //return <Navigate to="/login" />;
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);
    
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout