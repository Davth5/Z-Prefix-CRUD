import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  console.log("UserProvider - Current user state:", user);
  console.log("UserProvider - Providing setUser function:", setUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
