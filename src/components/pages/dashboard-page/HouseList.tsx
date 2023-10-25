'use client';
import HouseCard from '@/components/house-card/HouseCard';
import { ChevronIcon, ManWithHouse } from '@/components/icons';
import { House } from '@prisma/client';
import Link from 'next/link';

interface HouseListProps {
  houses: House[];
  selectedHouse: string | null;
  handleSelectHouse: (id: string) => void;
}

const HouseList = ({
  houses,
  selectedHouse,
  handleSelectHouse,
}: HouseListProps) => {
  const toHouseDetailPage = `/dashboard/${selectedHouse}`;

  return (
    <>
      {selectedHouse && (
        <Link
          href={toHouseDetailPage}
          className='mb-2 ml-auto flex w-fit flex-row-reverse items-center gap-1 hover:underline'
        >
          <ChevronIcon className='h-5 w-5 rotate-180' />
          See detail
        </Link>
      )}

      <div className='grow'>
        {houses.length > 0 ? (
          <div className='flex max-w-[1060px] gap-6 overflow-x-scroll px-4 pb-8 pt-3'>
            {houses.map((house) => (
              <HouseCard
                key={house.id}
                houseName={house.houseName}
                location={house.location}
                onClick={() => handleSelectHouse(house.id)}
                isSelected={selectedHouse === house.id}
              />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center py-16'>
            <ManWithHouse className='h-[100px] w-[100px]' />
            <p className='py-4 text-sm text-slate-400'>
              No houses enrolled yet
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default HouseList;
