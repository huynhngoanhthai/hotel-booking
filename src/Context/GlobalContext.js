import axios from "axios";
import React, { createContext, useContext, useState } from "react";

// Tạo một context mới
const AuthContext = createContext();
function AuthProvider(props) {
  const [values, setValues] = useState();
  const handleCheckLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/me");
      if (response) {
        setValues(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={values} {...props}></AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider, useAuth };
