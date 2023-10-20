import { nextAPI } from '@/lib/axios';
import { House, Tenant } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

type Args = {
  houseId: string | null;
};

type Data = {
  tenant: Tenant[];
} & House;

const fetchHouse = async ({ houseId }: Args) => {
  if (!houseId) return;

  const res = await nextAPI(`/house/${houseId}`);
  return res.data;
};

export const useFetchHouse = (houseId: string | null) =>
  useQuery<Data>(['house', houseId], () => fetchHouse({ houseId }));
