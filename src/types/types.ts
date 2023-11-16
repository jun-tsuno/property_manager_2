import { House, Tenant } from '@prisma/client';

export type HouseWithTenant = House & {
  tenant: Pick<Tenant, 'id'>[];
};
