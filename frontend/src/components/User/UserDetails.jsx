import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { fetchUserDetails } from '../../utils/api';
import "./UserDetails.css";

const UserDetails = () => {
  const { user } = useContext(AuthContext);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const data = await fetchUserDetails(user.upi_id);
      setDetails(data);
    };
    getUserDetails();
  }, [user]);

  if (!details) return <p>Loading...</p>;

  return (
    <div>
      <h3>User Details</h3>
      <p>Name: {details.name}</p>
      <p>Email: {details.email}</p>
      <p>UPI ID: {details.upi_id}</p>
      <p>Balance: {details.balance}</p>
    </div>
  );
};

export default UserDetails;
