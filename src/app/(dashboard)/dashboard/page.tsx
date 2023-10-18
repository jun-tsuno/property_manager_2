import HouseList from '@/components/pages/dashboard-page/HouseList';

const DashboardPage = async () => {
  return (
    <>
      <div className='flex flex-col lg:flex-row'>
        <HouseList />
        {/* <div className='min-w-[300px] lg:ml-5 lg:min-w-[400px] lg:border-l-2 lg:border-gray lg:pl-8'>
          <AddHouseForm />
        </div> */}
      </div>
    </>
  );
};

export default DashboardPage;
