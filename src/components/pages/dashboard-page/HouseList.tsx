'use client';
import HouseCard from '@/components/house-card/HouseCard';
import { ManWithHouse } from '@/components/icons';
import AddHouseModal from '@/components/modal/AddHouseModal';
import { useFetchHouses } from '@/hooks/useFetchHouses';

const HouseList = () => {
  const { data: houses, isLoading, isError } = useFetchHouses();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <>
      <section className='grow'>
        <h2 className='flex items-center gap-4 py-5'>
          <span>Your House List</span>
          <AddHouseModal />
        </h2>

        {houses.length > 0 ? (
          <div className='flex max-w-[1060px] gap-6 overflow-x-scroll px-4 pb-8 pt-6'>
            {houses.map((house) => (
              <HouseCard
                key={house.id}
                houseId={house.id}
                houseName={house.houseName}
                location={house.location}
              />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center py-16'>
            <ManWithHouse className='h-[100px] w-[100px]' />
            <p className='py-4'>No houses enrolled yet</p>
          </div>
        )}
      </section>
    </>
  );
};

export default HouseList;
