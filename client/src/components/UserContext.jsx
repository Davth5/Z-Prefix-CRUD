import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  registrationSuccess: false, 
  handleUserRegistered: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); 

  const handleUserRegistered = (userData) => {
    setUser(userData);
    setRegistrationSuccess(true);
  };

  console.log("UserProvider - Current user state:", user);

  return (
    <UserContext.Provider
      value={{ user, setUser, registrationSuccess, handleUserRegistered }}
    >
      {children}
    </UserContext.Provider>
  );
};
