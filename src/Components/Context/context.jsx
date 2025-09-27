import { createContext, useState } from "react";

// Create a new context object that can be used across the app
export const AuthContext = createContext();

export const MyContext = ({ children }) => {
  // State to track login status
  // Initial value is taken from localStorage ("setLogin") if it exists, otherwise false
  const [login, setLogin] = useState(
    JSON.parse(localStorage.getItem("setLogin")) || false
  );

  return (
    // Provide `login` state and `setLogin` updater to all children components
    <AuthContext.Provider value={{ login, setLogin }}>
      {children} {/* Render all child components inside the provider */}
    </AuthContext.Provider>
  );
};
