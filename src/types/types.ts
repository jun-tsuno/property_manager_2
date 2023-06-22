import { Payment, Tenant } from '@prisma/client';

export type TenantWithPayment = Tenant & {
  payment: Pick<Payment, 'id'>[];
};
