import BackButton from '@/components/back-button/back-button';
import TenantInformation from '@/components/pages/tenant-page/TenantInformation';

export const metadata = {
  title: 'Tenant',
};

const TenantPage = async ({ params }: { params: { tenant_id: string } }) => {
  const { tenant_id } = params;

  return (
    <>
      <BackButton href='/dashboard' label='Home' className='mb-3 pt-6' />
      <h2 className='mb-10'>Tenant Information</h2>
      <TenantInformation tenantId={tenant_id} />
    </>
  );
};

export default TenantPage;
