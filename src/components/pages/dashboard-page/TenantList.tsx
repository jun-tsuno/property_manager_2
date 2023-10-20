'use client';
import { HouseIcon } from '@/components/icons';
import { useFetchHouse } from '@/hooks/use-fetch-house';

interface TenantListProps {
  selectedHouse: string | null;
}

const TenantList = ({ selectedHouse }: TenantListProps) => {
  const { data: house, isLoading, isError } = useFetchHouse(selectedHouse);
  const tenants = house?.tenant;

  if (isLoading) return <div>loading...</div>;

  if (isError) return <div>error...</div>;

  return (
    <>
      <section>
        <h3 className='flex items-center gap-2 font-bold'>
          <HouseIcon className='h-6 w-6' />
          {house?.houseName}
        </h3>

        {tenants && tenants?.length > 0 ? (
          <div></div>
        ) : (
          <div className='py-16 text-center'>
            <p className='font-bold text-slate-400'>No tenants</p>
          </div>
        )}
      </section>
    </>
  );
};

export default TenantList;
