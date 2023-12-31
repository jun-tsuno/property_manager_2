import { nextAPI } from '@/lib/axios';
import { House, Tenant } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

type Args = {
  tenantId: string | null;
};

type Data = {
  house: House;
} & Tenant;

const fetchTenant = async ({ tenantId }: Args) => {
  if (!tenantId) return;

  const res = await nextAPI(`/tenant?id=${tenantId}`);
  return res.data;
};

export const useFetchTenant = (tenantId: string) =>
  useQuery<Data>(['tenant', tenantId], () => fetchTenant({ tenantId }));
