import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default ({ children }) => {
  const [auth, setAuth] = useState("");
  return (
    <AuthContext.Provider value={{ email: auth, setEmail: setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
