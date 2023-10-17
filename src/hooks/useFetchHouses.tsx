import { nextAPI } from '@/lib/axios';
import { House } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

const fetchHouses = async () => {
  const res = await nextAPI('/houses');
  return res.data as House[];
};

export const useFetchHouses = () => useQuery(['houses'], fetchHouses);
