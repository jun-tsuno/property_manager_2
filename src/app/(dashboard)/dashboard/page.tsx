import HouseInformation from '@/components/pages/dashboard-page/HouseInformation';

export const metadata = {
  title: 'Home',
};

const DashboardPage = async () => {
  return (
    <>
      <div className='mb-8 md:mb-16'>
        <HouseInformation />
      </div>
    </>
  );
};

export default DashboardPage;
