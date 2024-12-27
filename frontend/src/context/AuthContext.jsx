import React, { createContext, useState } from 'react';
import { loginUser } from '../utils/api.jsx';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    if (response) setUser(response);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
