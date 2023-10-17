'use client';
import HouseCard from '@/components/house-card/house-card';
import { useFetchHouses } from '@/hooks/useFetchHouses';
import HouseWithMan from '../../../../public/svgIcon/house-man';

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
      <div className='grow'>
        <h2 className='py-5'>Your House List</h2>
        {houses.length > 0 ? (
          <div className='flex min-w-[400px] overflow-x-scroll py-14 lg:flex-wrap lg:justify-center lg:overflow-hidden'>
            {houses.map((house) => {
              return (
                <div
                  key={house.id}
                  className='mx-3 my-4 aspect-video  min-w-[350px] cursor-pointer rounded-md shadow-md shadow-black/30 hover:border-2 hover:border-gradient-var4'
                >
                  <HouseCard
                    houseId={house.id}
                    houseName={house.houseName}
                    location={house.location}
                  />
                </div>
              );
            })}{' '}
          </div>
        ) : (
          <div className='flex flex-col items-center py-16'>
            <HouseWithMan width={100} height={100} />
            <p className='py-4'>No houses enrolled yet</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HouseList;
