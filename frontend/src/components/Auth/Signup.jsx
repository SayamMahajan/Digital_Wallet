import React, { useState } from 'react';
import { signupUser } from '../../utils/api';
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await signupUser(name, email, password);
    setMessage(response.message);
  };

  return (
    <form onSubmit={handleSignup}>
      <h3>Signup</h3>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Signup</button>
      <p>{message}</p>
    </form>
  );
};

export default Signup;
