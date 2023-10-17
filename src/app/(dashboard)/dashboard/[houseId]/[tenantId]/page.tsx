import BackButton from '@/components/back-button/back-button';
import DeleteTenantDialog from '@/components/dialog/delete-tenant';
import Layout from '@/components/layout/layout';
import TenantCard from '@/components/tenant-card/tenant-card';
import { api } from '@/lib/axios';
import { TenantWithPayment } from '@/types/types';
import UserIcon from '../../../../../../public/svgIcon/user';

const TenantPage = async ({
  params,
}: {
  params: { houseId: string; tenantId: string };
}) => {
  const { tenantId, houseId } = params;

  const res = await api.get(`/api/tenant?id=${tenantId}`);
  const tenant = res.data.tenant as TenantWithPayment;

  return (
    <>
      <Layout>
        {tenant && (
          <>
            <div className='flex items-center pb-5 pl-3 pt-8'>
              <BackButton to={`/dashboard/${houseId}`} />
              <h2 className='px-10'>Tenant Detail</h2>
            </div>
            <div className='mx-auto flex max-w-[1000px] flex-col items-center md:flex-row md:items-start md:justify-around'>
              <div className='pt-8'>
                <UserIcon
                  width={120}
                  height={120}
                  className='bg-light-gray rounded-full p-3 shadow-lg shadow-black/20'
                />
                <h3 className='p-3 text-center'>{tenant.name}</h3>
              </div>
              <TenantCard tenant={tenant} />
            </div>

            <div className='mt-10 text-center'>
              <DeleteTenantDialog tenantId={tenantId} houseId={houseId} />
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default TenantPage;
