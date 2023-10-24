import BackButton from '@/components/back-button/BackButton';
import TenantInformation from '@/components/pages/tenant-page/TenantInformation';

export const metadata = {
  title: 'Tenant',
};

const TenantPage = async ({ params }: { params: { tenant_id: string } }) => {
  const { tenant_id } = params;

  return (
    <>
      <div className='pb-10 pt-6'>
        <BackButton href='/dashboard' label='Home' className='mb-6' />
        <TenantInformation tenantId={tenant_id} />
      </div>
    </>
  );
};

export default TenantPage;
