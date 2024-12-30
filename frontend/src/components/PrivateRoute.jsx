import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/check-auth', {
      withCredentials: true,
    })
      .then(response => {
        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(error => console.error("Error fetching profile data:", error))
      .finally(() => setLoading(false)); 
  }, []);

  if (loading) return <div>Loading...</div>;


  if (!isAuthenticated) return <Navigate to="/login" />;

  return element;  
};

export default PrivateRoute;
