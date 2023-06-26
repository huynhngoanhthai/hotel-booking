import React, { createContext, useContext, useState } from "react";

// Tạo một context mới
const AuthContext = createContext();
function AuthProvider(props) {
  const [values] = useState();
  
  // handleCheckLogin();

  return (
    <AuthContext.Provider value={values} {...props}></AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider, useAuth };
