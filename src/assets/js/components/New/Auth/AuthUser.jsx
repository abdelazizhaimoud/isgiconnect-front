import React, { useState, useEffect } from 'react';
import axiosClient from '../../../api/axios';

function AuthUser() {
  const [isValid, setIsValid] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          // Make a request to a protected endpoint to verify the token
          await axiosClient.get('/api/verify-token', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsValid(true); // Token is valid
          console.log('Token is valid:', token, user);
        } catch (error) {
          console.error('Token verification failed:', error);
          setIsValid(false); // Token is invalid or expired
        //   localStorage.removeItem('user'); // Clear invalid session
        //   localStorage.removeItem('token');
        }
      }
    };

    verifyToken();
  }, [token]);

  return isValid ? user : null;
}

export default AuthUser;