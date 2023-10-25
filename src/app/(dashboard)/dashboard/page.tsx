import HouseInformation from '@/components/pages/dashboard-page/HouseInformation';

export const metadata = {
  title: 'Home',
};

const DashboardPage = async () => {
  return (
    <>
      <div className='pb-8 md:pb-[120px]'>
        <HouseInformation />
      </div>
    </>
  );
};

export default DashboardPage;
