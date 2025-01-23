import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom';

function UserProtectedWrapper({children}) {

    const token = localStorage.getItem("token");
    if (token === null || token === undefined || !token) {
        return <Navigate to="/login" />;
    }
  return <div>{children}</div>;
}

export default UserProtectedWrapper