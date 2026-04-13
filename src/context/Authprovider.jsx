import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localstorage';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  // localStorage.clear();

  const [userData, setUserdata] = useState(() => {
    setLocalStorage();  
    const { employees, admin , total } = getLocalStorage();
    return { employees, admin , total };
  });
    
  // console.log(userData);

  return (
    <div>
      <AuthContext.Provider value={[userData, setUserdata]}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider
