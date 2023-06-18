import AddTenantForm from '@/components/Form/AddTenantForm';
import BackButton from '@/components/back-button/back-button';
import Layout from '@/components/layout/layout';

const AddTenantPage = ({ params }: { params: { houseId: string } }) => {
  const houseId = params.houseId;

  return (
    <>
      <Layout>
        <div className='flex items-center py-5 pl-3'>
          <BackButton to={`/dashboard/${houseId}`} />
          <h2 className='px-10'>Add Tenant</h2>
        </div>
        <div className='mx-auto w-[80%] max-w-[500px] py-12'>
          <AddTenantForm houseId={houseId} />
        </div>
      </Layout>
    </>
  );
};

export default AddTenantPage;
