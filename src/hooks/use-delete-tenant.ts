import { nextAPI } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Args = {
  tenantId: string;
};

const deleteTenant = async ({ tenantId }: Args) => {
  const res = await nextAPI.delete(`/tenant?id=${tenantId}`);

  return res.data;
};

export const useDeleteTenant = (tenantId: string, houseId: string) => {
  const queryClient = useQueryClient();

  return useMutation(deleteTenant, {
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['tenant', tenantId] }),
        queryClient.invalidateQueries({ queryKey: ['house', houseId] }),
      ]),
  });
};
