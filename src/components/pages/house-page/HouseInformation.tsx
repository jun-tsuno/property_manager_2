'use client';
import { HouseIllustration } from '@/components/icons';
import EditHouseModal from '@/components/pages/house-page/EditHouseModal';
import ListItem from '@/components/pages/house-page/ListItem';
import CustomToast from '@/components/toast/CustomToast';
import { useFetchHouse } from '@/hooks/use-fetch-house';
import DeleteHouseModal from './DeleteHouseModal';

interface HouseInformationProps {
  houseId: string;
}

const HouseInformation = ({ houseId }: HouseInformationProps) => {
  const { data: house } = useFetchHouse(houseId);
  const tenantsCount = house?.tenant.length;

  return (
    <>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:gap-10'>
        <HouseIllustration className='mx-auto aspect-square w-[180px] rounded-full border border-slate-300 md:w-[220px]' />
        <ul className='md:min-w-[300px] md:max-w-[600px] md:grow'>
          <ListItem label='House Name' value={house?.houseName} />
          <ListItem label='Location' value={house?.location} />
          <ListItem label='Current Tenants' value={tenantsCount?.toString()} />
        </ul>
      </div>

      {house && (
        <div className='mx-auto mt-20 flex flex-col gap-3 sm:mt-[120px] sm:max-w-[600px] sm:flex-row'>
          <EditHouseModal house={house} />
          <DeleteHouseModal houseId={house.id} />
        </div>
      )}

      <CustomToast />
    </>
  );
};

export default HouseInformation;
