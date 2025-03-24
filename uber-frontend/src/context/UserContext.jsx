import React, { createContext, useState } from 'react';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: '',
    },
  });

  const [isLoading, setIsLoading] = useState(true); // ✅ Added state

  return (
    <UserDataContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
