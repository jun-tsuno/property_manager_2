'use client';
import { HouseIllustration } from '@/components/icons';
import EditHouseModal from '@/components/pages/house-page/EditHouseModal';
import ListItem from '@/components/pages/house-page/ListItem';
import { useFetchHouse } from '@/hooks/use-fetch-house';
import Image from 'next/image';
import Link from 'next/link';
import DeleteHouseModal from './DeleteHouseModal';

interface HouseInformationProps {
  houseId: string;
}

const HouseInformation = ({ houseId }: HouseInformationProps) => {
  const { data: house } = useFetchHouse(houseId);

  const tenants = house?.tenant;

  return (
    <>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:gap-10'>
        <HouseIllustration className='mx-auto aspect-square w-[180px] rounded-full border border-slate-300 md:w-[220px]' />

        <ul className='md:min-w-[300px] md:max-w-[600px] md:grow'>
          <ListItem label='House Name'>
            <span>{house?.houseName}</span>
          </ListItem>
          <ListItem label='Location'>
            <span>{house?.location}</span>
          </ListItem>
          <ListItem label='Current Tenants'>
            <ul className='flex flex-col gap-3'>
              {tenants &&
                tenants.map((tenant) => (
                  <li key={tenant.id} className='flex items-center gap-2'>
                    <Image
                      src={tenant.avatar || '/image/avatar-cat.jpg'}
                      alt={tenant.name}
                      width={0}
                      height={0}
                      sizes='100vw'
                      className='aspect-square w-8 rounded-full object-cover md:w-12'
                    />
                    <Link
                      href={`/dashboard/${houseId}/${tenant.id}`}
                      className='rounded-lg bg-slate-100 px-2 py-1 text-slate-600 hover:brightness-95'
                    >
                      {tenant.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </ListItem>
        </ul>
      </div>

      {house && (
        <div className='mx-auto mt-20 flex flex-col gap-3 sm:mt-[120px] sm:max-w-[600px] sm:flex-row'>
          <EditHouseModal house={house} />
          <DeleteHouseModal houseId={house.id} />
        </div>
      )}
    </>
  );
};

export default HouseInformation;
