import BackButton from '@/components/back-button/BackButton';
import HouseInformation from '@/components/pages/house-page/HouseInformation';

export const metadata = {
  title: 'House Detail',
};

const HousePage = async ({ params }: { params: { house_id: string } }) => {
  const houseId = params.house_id;

  return (
    <>
      <section className='mb:mb-[120px] pb-8 pt-6'>
        <BackButton label='Home' href='/dashboard' className='mb-2' />
        <h2 className='mb-8 lg:mb-16'>House Detail</h2>

        <HouseInformation houseId={houseId} />
      </section>
    </>
  );
};

export default HousePage;
