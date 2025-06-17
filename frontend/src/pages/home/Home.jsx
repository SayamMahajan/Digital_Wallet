import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import Layout from '../../components/layout/Layout';
import HomeContent from './HomeContent';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const api = useApi();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/api/users/profile');
        setUserData(response.user);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (api.loading || !userData) {
    return (
      <Layout>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px' 
        }}>
          <LoadingSpinner size="large" color="white" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <HomeContent users={userData} />
    </Layout>
  );
};

export default Home;