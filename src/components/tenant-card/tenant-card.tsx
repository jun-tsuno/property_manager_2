import { dateFormat } from '@/helper/dateFormat';
import { Tenant } from '@prisma/client';
import CalenderIcon from '../../../public/svgIcon/calender';
import DollarIcon from '../../../public/svgIcon/dollar';

interface TenantCardProps {
  tenant: Tenant;
}

const TenantCard = ({ tenant }: TenantCardProps) => {
  const startDate = dateFormat(tenant.startDate);
  const endDate = dateFormat(tenant.endDate);

  return (
    <>
      <div className='rounded-md bg-light-gray px-8 py-14 shadow-lg shadow-black/30 md:w-[50%] md:max-w-[400px]'>
        <div className='space-y-1'>
          <p>
            <span className='px-2 font-bold'>Room:</span>
            {tenant.roomId}
          </p>
          <p>
            <span className='px-2 font-bold'>Tel:</span> {tenant.phone || '-'}
          </p>
          <p>
            <span className='px-2 font-bold'>Contact:</span> {tenant.email}
          </p>
        </div>
        <div className='mt-8 space-y-2 text-lg'>
          <p className='flex items-center'>
            <CalenderIcon />
            <span className='px-2 font-bold'>From:</span>
            {startDate || '-'}
          </p>
          <p className='flex items-center'>
            <CalenderIcon />
            <span className='px-2 font-bold'>To:</span> {endDate || '-'}
          </p>
          <p className='flex items-center'>
            <DollarIcon />
            <span className='px-2 font-bold'>Rent/month:</span> ${tenant.fee}
          </p>
        </div>
      </div>
    </>
  );
};

export default TenantCard;
