import { nextAPI } from '@/lib/axios';
import { Tenant } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

type Args = {
  tenantId: string | null;
};

const fetchTenant = async ({ tenantId }: Args) => {
  if (!tenantId) return;

  const res = await nextAPI(`/tenant?id=${tenantId}`);
  return res.data;
};

export const useFetchTenant = (tenantId: string | null) =>
  useQuery<Tenant>(['tenant', tenantId], () => fetchTenant({ tenantId }));
