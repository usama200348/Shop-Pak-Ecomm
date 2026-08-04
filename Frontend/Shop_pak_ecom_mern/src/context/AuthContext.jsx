// import React from 'react'
// import { useState } from 'react';
// import { createContext } from 'react'

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
    
//     const [user,setUser]=useState(null);
//      const storedUser = localStorage.getItem("userInfo");
// //  return storedUser ? JSON.parse(storedUser) : null;

//     // Login
//     const login = (userData)=>{
//         setUser(userData);
//         localStorage.setItem("userInfo",JSON.stringify(userData));
//     };
// // Logout
//     const Logout=()=>{
//         setUser(null);
//         localStorage.removeItem('userInfo');
//     };

//     return(
//         <AuthContext.Provider value={{user,login,Logout}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }



import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // Get user from LocalStorage when app starts
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
  };

  // Logout
  const Logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};