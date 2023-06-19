import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://rent-management-2.vercel.app/',
});
