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
  tenantId: string;
};

const updateTenant = async ({
  name,
  email,
  roomId,
  phone,
  fee,
  startDate,
  endDate,
  tenantId,
}: Args) => {
  const res = await nextAPI.patch(`/tenant?id=${tenantId}`, {
    name,
    email,
    roomId,
    phone,
    fee,
    startDate,
    endDate,
  });

  return res.data;
};

export const useUpdateTenant = (tenantId: string, houseId: string) => {
  const queryClient = useQueryClient();

  return useMutation(updateTenant, {
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['tenant', tenantId] }),
        queryClient.invalidateQueries({ queryKey: ['house', houseId] }),
      ]),
  });
};
