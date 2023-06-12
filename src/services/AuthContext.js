import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const ContextProvider = (props) => {
  const [isStaffLogin, setIsStaffLogin] = useState(false);
  const [isCustomerLogin, setIsCustomerLogin] = useState(false);

  useEffect(() => {
    checkCustomerLogin();
    checkStaffLogin();
  }, []);

  const checkCustomerLogin = () => {
    if (localStorage.getItem('customerToken')) {
      setIsCustomerLogin(true);
      console.log('CustomerLogin O');
    } else {
      setIsCustomerLogin(false);
      console.log('CustomerLogin X');
    }
  };

  const checkStaffLogin = () => {
    if (localStorage.getItem('staffToken')) {
      setIsStaffLogin(true);
      console.log('StaffLogin O');
    } else {
      setIsStaffLogin(false);
      console.log('StaffLogin X');
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.replace('/');
    setIsCustomerLogin(false);
    setIsStaffLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isStaffLogin,
        setIsStaffLogin,
        isCustomerLogin,
        setIsCustomerLogin,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
