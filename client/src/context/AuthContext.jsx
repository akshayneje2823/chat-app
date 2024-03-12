import  { createContext, useContext, useState } from "react";

// step 1: create context
export const AuthContext = createContext();

// context hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// step 2: create context provider
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-app")) || null
  );
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
