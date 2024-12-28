import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const loginUser = async (email, password) => {
  const { data } = await API.post('/auth/login', { email, password });
  return data;
};

export const signupUser = async (name, email, password) => {
  const { data } = await API.post('/auth/signup', { name, email, password });
  return data;
};

export const fetchUserDetails = async (upi_id) => {
  const { data } = await API.get(`/users/${upi_id}`);
  return data;
};

export const fetchTransactions = async () => {
  const { data } = await API.get(`/transactions`);
  return data;
};

export const createTransaction = async (sender_upi_id, receiver_upi_id, amount) => {
  const { data } = await API.post('/transactions', { sender_upi_id, receiver_upi_id, amount });
  return data;
};
