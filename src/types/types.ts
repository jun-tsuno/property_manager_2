import { Tenant } from '@prisma/client';

export interface TenantWithPayment extends Tenant {
  payment: { id: string }[];
}
