import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

export const apiServiceWithoutToken = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: sessionStorage.getItem('token'),
  },
});
