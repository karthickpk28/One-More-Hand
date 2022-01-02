import React from "react";
import AuthProvider, { AuthContext } from "./auth";

export { AuthContext };

export default ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
