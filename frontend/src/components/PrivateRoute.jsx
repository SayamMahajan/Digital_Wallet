import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/check-auth', {
      withCredentials: true,
    })
      .then(response => {
        if (response.data.success) {
          setIsAuthenticated(true);
        }
        console.log(response.data);
        console.log(response.data.success);
      })
      .catch(error => console.error("Error fetching profile data:", error))
      .finally(() => setLoading(false)); // Set loading to false after API call
  }, []);

  // Show a loading indicator while checking authentication
  if (loading) return <div>Loading...</div>; // You can replace this with a spinner or other UI

  // Redirect to login page if not authenticated
  if (!isAuthenticated) return <Navigate to="/login" />;

  return element;  
};

export default PrivateRoute;
