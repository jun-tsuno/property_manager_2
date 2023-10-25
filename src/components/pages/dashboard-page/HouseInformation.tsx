'use client';
import FetchError from '@/components/error/FetchError';
import { HouseSelect } from '@/components/icons';
import Loading from '@/components/loading/Loading';
import AddHouseModal from '@/components/modal/AddHouseModal';
import { useFetchHouses } from '@/hooks/use-fetch-houses';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import HouseList from './HouseList';
import TenantListSection from './TenantListSection';
const CustomToast = dynamic(() => import('@/components/toast/CustomToast'));

const HouseInformation = () => {
  const [selectedHouse, setSelectedHouse] = useState<string>('');
  const { data: houses, isLoading, isError } = useFetchHouses();

  useEffect(() => {
    if (!houses) return;

    if (houses.length > 0) {
      setSelectedHouse(houses[0].id);
    }
  }, [houses]);

  const handleSelectHouse = (id: string) => {
    setSelectedHouse(id);
  };

  if (isLoading) {
    return <Loading withText />;
  }

  if (isError) {
    return <FetchError />;
  }

  return (
    <>
      <section className='mb-10'>
        <h2 className='flex flex-col gap-2 pt-6'>
          <span>Your House List</span>
          <AddHouseModal />
        </h2>
        <HouseList
          houses={houses}
          selectedHouse={selectedHouse}
          handleSelectHouse={handleSelectHouse}
        />
      </section>

      <section>
        <h2 className='flex items-center gap-4 pb-2'>Tenant List</h2>
        {selectedHouse ? (
          <TenantListSection selectedHouse={selectedHouse} />
        ) : (
          <div className='flex flex-col items-center gap-4 py-16'>
            <HouseSelect className='aspect-auto w-[150px]' />
            <p className='text-sm text-slate-400'>No House is selected</p>
          </div>
        )}
      </section>

      <CustomToast />
    </>
  );
};

export default HouseInformation;
