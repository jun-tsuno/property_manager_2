'use client';
import { HouseSelect } from '@/components/icons';
import AddHouseModal from '@/components/modal/AddHouseModal';
import { useFetchHouses } from '@/hooks/use-fetch-houses';
import { useEffect, useState } from 'react';
import HouseList from './HouseList';
import TenantList from './TenantList';

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
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <>
      <section>
        <h2 className='flex items-center gap-4 py-5'>
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
        <h2 className='flex items-center gap-4 py-5'>Tenant List</h2>
        {selectedHouse ? (
          <TenantList selectedHouse={selectedHouse} />
        ) : (
          <div className='flex flex-col items-center gap-4 py-16'>
            <HouseSelect className='aspect-auto w-[150px]' />
            <p className='text-sm text-slate-400'>No House is selected</p>
          </div>
        )}
      </section>
    </>
  );
};

export default HouseInformation;
