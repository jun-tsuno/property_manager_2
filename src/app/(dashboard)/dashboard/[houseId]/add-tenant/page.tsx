import BackButton from '@/components/back-button/back-button';
import AddTenantForm from '@/components/form/add-tenant-form';
import Layout from '@/components/layout/layout';
import PeoplePicture from '../../../../../../public/svgIcon/people';

const AddTenantPage = ({ params }: { params: { houseId: string } }) => {
  const houseId = params.houseId;

  return (
    <>
      <Layout>
        <div className='flex items-center py-5 pl-3'>
          <BackButton to={`/dashboard/${houseId}`} />
          <h2 className='px-10'>Add Tenant</h2>
        </div>
        <div className='flex max-w-[1300px] flex-col lg:flex-row lg:justify-center'>
          <div className='mx-auto max-w-[700px] rounded-md px-10 py-12 shadow-lg shadow-black/40'>
            <AddTenantForm houseId={houseId} />
          </div>
          <div className='hidden py-8 sm:block sm:w-[300px] xl:w-[400px]'>
            <PeoplePicture />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AddTenantPage;
