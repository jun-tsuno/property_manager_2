import { TenantWithPayment } from '@/types/types';
import { dateFormat } from '@/utils/dateFormat';
import { format } from 'date-fns';
import CalenderIcon from '../../../public/svgIcon/calender';
import DollarIcon from '../../../public/svgIcon/dollar';
import DoorIcon from '../../../public/svgIcon/door';
import MailIcon from '../../../public/svgIcon/mail';
import PhoneIcon from '../../../public/svgIcon/phone';
import PaymentDialog from '../dialog/payment';

interface TenantCardProps {
  tenant: TenantWithPayment;
}

const TenantCard = ({ tenant }: TenantCardProps) => {
  const startDate = dateFormat(tenant.startDate);
  const endDate = dateFormat(tenant.endDate);
  const thisMonth = format(new Date(), 'LLL');

  const hasPaid = !!tenant.payment[0]?.id;

  return (
    <>
      <div className='bg-light-gray rounded-md px-8 py-14 shadow-lg shadow-black/30 md:w-[50%] md:max-w-[600px]'>
        <div className='space-y-1'>
          <p className='flex items-center'>
            <DoorIcon />
            <span className='px-2 font-bold'>Room:</span>
            {tenant.roomId}
          </p>
          <p className='flex items-center'>
            <PhoneIcon />
            <span className='px-2 font-bold'>Tel:</span> {tenant.phone || '-'}
          </p>
          <p className='flex items-center'>
            <MailIcon />
            <span className='px-2 font-bold'>Contact:</span> {tenant.email}
          </p>
        </div>
        <div className='mt-8 space-y-2'>
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

          <div className='flex items-center justify-between pt-4 font-bold'>
            <div>
              Rent for {thisMonth}:{' '}
              <span
                className={`rounded-full px-2 py-1 ${
                  hasPaid ? 'bg-green' : 'bg-destructive text-white'
                }`}
              >
                {hasPaid ? 'Paid' : 'Unpaid'}
              </span>
            </div>
            <PaymentDialog tenantId={tenant.id} hasPaid={hasPaid} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantCard;
