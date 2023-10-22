import { nextAPI } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Args = {
  name: string;
  email: string;
  roomId?: number;
  phone?: string;
  fee: number;
  startDate: Date;
  endDate?: Date;
  houseId: string;
};

const addTenant = async ({
  name,
  email,
  roomId,
  phone,
  fee,
  startDate,
  endDate,
  houseId,
}: Args) => {
  const res = await nextAPI.post('/tenant', {
    name,
    email,
    roomId,
    phone,
    fee,
    startDate,
    endDate,
    houseId,
  });

  return res.data;
};

export const useAddTenant = (houseId: string) => {
  const queryClient = useQueryClient();

  return useMutation(addTenant, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['house', houseId] });
    },
  });
};
