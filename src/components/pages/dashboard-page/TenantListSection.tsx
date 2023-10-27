'use client';
import FetchError from '@/components/error/FetchError';
import { HouseIcon } from '@/components/icons';
import Loading from '@/components/loading/Loading';
import CustomToast from '@/components/toast/CustomToast';
import { Button } from '@/components/ui/button';
import { useFetchHouse } from '@/hooks/use-fetch-house';
import Link from 'next/link';
import TenantList from './TenantList';

interface TenantListProps {
  selectedHouse: string | null;
}

const TenantListSection = ({ selectedHouse }: TenantListProps) => {
  const { data: house, isLoading, isError } = useFetchHouse(selectedHouse);
  const tenants = house?.tenant;
  const houseId = house?.id;

  if (isLoading) return <Loading withText />;

  if (isError) return <FetchError />;

  return (
    <>
      <section>
        <Link href={`/dashboard/add-tenant/${houseId}`} className='block w-fit'>
          <Button>Add Tenant</Button>
        </Link>
        <h3 className='mt-2 flex items-center justify-center gap-2 font-bold'>
          <HouseIcon className='h-6 w-6' />
          {house?.houseName}
        </h3>

        {tenants && tenants?.length > 0 ? (
          <div className='my-6 w-full'>
            <TenantList tenants={tenants} />
          </div>
        ) : (
          <div className='py-10 text-center'>
            <p className='font-bold text-slate-400'>No tenants</p>
          </div>
        )}

        <CustomToast />
      </section>
    </>
  );
};

export default TenantListSection;
