import { ChevronIcon } from '@/components/icons';
import TenantTable from '@/components/table/TenantTable';
import { dateFormat } from '@/utils/date-formatter';
import { Tenant } from '@prisma/client';
import Link from 'next/link';

interface TenantListProps {
  tenants: Tenant[];
}

const TenantList = ({ tenants }: TenantListProps) => {
  return (
    <>
      {/* for mobile */}
      <ul className='grid gap-4 sm:hidden'>
        {tenants.length > 0 &&
          tenants.map((tenant) => (
            <li
              key={tenant.id}
              className='flex items-center justify-between gap-2 border-[2px] border-slate-200 bg-slate-100 px-4 py-2 shadow-lg'
            >
              <div className='space-y-2'>
                <p className='font-bold'>{tenant.name}</p>
                <p className='text-sm'>{`Room: ${tenant.roomId || ''}`}</p>
                <p className='text-sm'>{`Fee: $${tenant.fee}/month`}</p>
                <p className='text-sm'>{`End Date: ${
                  dateFormat(tenant.endDate) || '-'
                }`}</p>
              </div>
              <Link href={`/dashboard/${tenant.houseId}/${tenant.id}`}>
                <ChevronIcon className='h-8 w-8 rotate-180 hover:scale-110' />
              </Link>
            </li>
          ))}
      </ul>

      {/* for desktop */}
      <TenantTable tenants={tenants} className='max-sm:hidden' />
    </>
  );
};

export default TenantList;
