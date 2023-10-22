import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const logout = () => {
    
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("idUsers");
    localStorage.removeItem("login");
    setUser(null);
      
  }

  

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, setUser, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
