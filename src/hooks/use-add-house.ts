import { nextAPI } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Args = {
  houseName: string;
  location: string;
};

const addHouse = async ({ houseName, location }: Args) => {
  const res = await nextAPI.post('/hose', {
    houseName,
    location,
  });

  return res.data;
};

export const useAddHouse = () => {
  const queryClient = useQueryClient();

  return useMutation(addHouse, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['houses'] });
    },
  });
};
