import BackButton from '@/components/back-button/back-button';
import AddTenantForm from '@/components/form/add-tenant-form';
import PeoplePicture from '../../../../../../public/svgIcon/people';

export const metadata = {
  title: 'Add Tenant',
};

const AddTenantPage = async ({ params }: { params: { house_id: string } }) => {
  const houseId = params.house_id;

  return (
    <>
      <section className=''>
        <BackButton href='/dashboard' label='Home' className='py-4' />
        <h2 className='mb-4 md:mb-8 lg:mb-10'>Add Tenant</h2>
        <div className='flex flex-col lg:flex-row lg:justify-center lg:gap-10'>
          <div className='py-6 md:px-4 md:shadow-lg md:shadow-black/40 lg:max-w-[640px] lg:grow'>
            <AddTenantForm houseId={houseId} />
          </div>
          <div className='hidden py-8 sm:block sm:w-[300px] xl:w-[400px]'>
            <PeoplePicture />
          </div>
        </div>
      </section>
    </>
  );
};

export default AddTenantPage;
