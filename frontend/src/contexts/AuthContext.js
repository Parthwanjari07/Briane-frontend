import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage on initial render
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in a real app, this would make an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const user = { 
            id: "1", 
            email, 
            name: "Karan", 
            brand: "YourBrand" 
          };
          localStorage.setItem("user", JSON.stringify(user));
          setCurrentUser(user);
          setIsAuthenticated(true);
          resolve(user);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  };

  const signup = (userData) => {
    // Mock signup - in a real app, this would make an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email && userData.password) {
          const user = { 
            id: "1", 
            email: userData.email, 
            name: userData.firstName + " " + userData.lastName 
          };
          localStorage.setItem("user", JSON.stringify(user));
          setCurrentUser(user);
          setIsAuthenticated(true);
          resolve(user);
        } else {
          reject(new Error("Invalid user data"));
        }
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
