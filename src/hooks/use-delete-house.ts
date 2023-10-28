import { nextAPI } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Args = {
  houseId: string;
};

const deleteHouse = async ({ houseId }: Args) => {
  const res = await nextAPI.delete(`/house/${houseId}`);

  return res.data;
};

export const useDeleteHouse = (houseId: string) => {
  const queryClient = useQueryClient();

  return useMutation(deleteHouse, {
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['house', houseId] }),
        queryClient.invalidateQueries({ queryKey: ['houses'] }),
      ]),
  });
};
