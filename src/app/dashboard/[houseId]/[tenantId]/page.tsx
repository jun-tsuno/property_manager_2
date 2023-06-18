import BackButton from '@/components/back-button/back-button';
import Layout from '@/components/layout/layout';
import { dateFormat } from '@/helper/dateFormat';
import { api } from '@/lib/axios';
import { Tenant } from '@prisma/client';
import CalenderIcon from '../../../../../public/svgIcon/calender';
import DollarIcon from '../../../../../public/svgIcon/dollar';
import UserIcon from '../../../../../public/svgIcon/user';

const TenantPage = async ({
  params,
}: {
  params: { houseId: string; tenantId: string };
}) => {
  const { tenantId, houseId } = params;

  const res = await api.get(`/api/tenant?id=${tenantId}`);
  const tenant = res.data.tenant as Tenant;

  const startDate = dateFormat(tenant.startDate);
  const endDate = dateFormat(tenant.endDate);

  return (
    <>
      <Layout>
        <div className='flex items-center pb-5 pl-3 pt-8'>
          <BackButton to={`/dashboard/${houseId}`} />
          <h2 className='px-10'>Tenant Detail</h2>
        </div>
        <div className='mx-auto flex max-w-[850px] flex-col items-center md:flex-row md:items-start md:justify-around'>
          <div className='pt-8'>
            <UserIcon
              width={120}
              height={120}
              className='rounded-full bg-light-gray p-3 shadow-lg shadow-black/20'
            />
            <h3 className='py-3 text-center'>{tenant.name}</h3>
          </div>
          <div className='rounded-md bg-light-gray px-8 py-14 shadow-lg shadow-black/30 md:w-[50%] md:max-w-[400px]'>
            <div className='space-y-1'>
              <p>
                <span className='px-2 font-bold'>Room:</span>
                {tenant.roomId}
              </p>
              <p>
                <span className='px-2 font-bold'>Tel:</span>{' '}
                {tenant.phone || '-'}
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
                <span className='px-2 font-bold'>Rent/month:</span> $
                {tenant.fee}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TenantPage;
