import { nextAPI } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Args = {
  houseName: string;
  location: string;
  houseId: string;
};

const updateHouse = async ({ houseName, location, houseId }: Args) => {
  const res = await nextAPI.patch(`/house/${houseId}`, {
    houseName,
    location,
  });

  return res.data;
};

export const useUpdateHouse = (houseId: string) => {
  const queryClient = useQueryClient();

  return useMutation(updateHouse, {
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['house', houseId] }),
        queryClient.invalidateQueries({ queryKey: ['houses'] }),
      ]),
  });
};
