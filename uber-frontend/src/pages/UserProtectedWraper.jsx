import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const UserProtectedWraper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { setUser, setIsLoading, isLoading } = useContext(UserDataContext);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      setIsLoading(true); // ✅ Set loading state
      axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.status === 200) {
          setUser(response.data);
        }
      })
      .catch(err => {
        console.error('Error fetching user profile:', err);
        localStorage.removeItem('token');
        navigate('/login'); // ✅ Redirect on error
      })
      .finally(() => {
        setIsLoading(false); // ✅ Reset loading state
      });
    }
  }, []); // ✅ No token in dependency array

  if (isLoading) {
    return <div>Loading...</div>; // ✅ Handle loading state
  }

  return <>{children}</>;
};

export default UserProtectedWraper;
