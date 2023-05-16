import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext(null);

export const ContextProvider = (props) => {
  const [isStaffLogin, setIsStaffLogin] = useState(false);
  const [isCustomerLogin, setIsCustomerLogin] = useState(false);

  useEffect(() => {
    /**고객 */
    if (!localStorage.getItem('customerToken')) {
      setIsCustomerLogin(false);
      console.log('CustomerLogin X');
    } else {
      setIsCustomerLogin(true);
      console.log('CustomerLogin O');
    }
    /**직원 */
    if (!localStorage.getItem('staffToken')) {
      setIsStaffLogin(false);
      console.log('StaffLogin X');
    } else {
      setIsStaffLogin(true);
      console.log('StaffLogin O');
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isStaffLogin,
        setIsStaffLogin,
        isCustomerLogin,
        setIsCustomerLogin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
