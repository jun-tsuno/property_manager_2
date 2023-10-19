import HouseInformation from '@/components/pages/dashboard-page/HouseInformation';

export const metadata = {
  title: 'Home',
};

const DashboardPage = async () => {
  return (
    <>
      <HouseInformation />
    </>
  );
};

export default DashboardPage;
