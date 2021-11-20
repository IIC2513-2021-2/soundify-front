import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, storeUser, clearStoredUser] = useLocalStorage('user');

  const handleUserLogin = (user) => {
    storeUser(user);
  };

  const handleUserLogout = () => {
    clearStoredUser();
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ currentUser, handleUserLogin, handleUserLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
