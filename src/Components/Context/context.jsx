import { createContext, useState } from "react";

export const AuthContext = createContext();

export const MyContext = ({ children }) => {
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem("setLogin")) || false);
  return (
    <AuthContext.Provider value={{ login, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
