import { House, Payment, Tenant } from '@prisma/client';

export type TenantWithPayment = Tenant & {
  payment: Pick<Payment, 'id'>[];
};

export type HouseWithTenant = House & {
  tenant: Pick<Tenant, 'id'>[];
};
