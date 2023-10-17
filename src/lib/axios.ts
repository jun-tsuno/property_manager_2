import axios from 'axios';

export const nextAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}/api`,
});
