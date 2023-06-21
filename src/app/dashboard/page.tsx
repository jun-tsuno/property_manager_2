import AddHouseForm from '@/components/form/add-house-form';
import HouseCard from '@/components/house-card/house-card';
import Layout from '@/components/layout/layout';
import { authOptions } from '@/lib/auth';
import { api } from '@/lib/axios';
import { House, Owner } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import HouseWithMan from '../../../public/svgIcon/house-man';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const { id: ownerId } = session?.user as Owner;

  const res = await api.get(`/api/house?id=${ownerId}`);
  const houseList = res.data.houseList as House[];

  return (
    <>
      <Layout>
        <div className='mx-auto my-10 flex max-w-[1200px] flex-col lg:flex-row'>
          <div>
            <h2 className='py-5'>Your House List</h2>
            {houseList.length > 0 ? (
              <div className='flex min-w-[400px] overflow-x-scroll py-14 lg:flex-wrap lg:justify-center lg:overflow-hidden'>
                {houseList.map((house) => {
                  return (
                    <div
                      key={house.id}
                      className='mx-3 my-4 aspect-video  min-w-[350px] cursor-pointer rounded-md shadow-md shadow-black/30 hover:border-2 hover:border-gradient-var4'
                    >
                      <HouseCard
                        houseId={house.id}
                        houseName={house.houseName}
                        location={house.location}
                      />
                    </div>
                  );
                })}{' '}
              </div>
            ) : (
              <div className='flex flex-col items-center py-16'>
                <HouseWithMan width={100} height={100} />
                <p className='py-4'>No houses enrolled yet</p>
              </div>
            )}
          </div>
          <div className='ml-5 min-w-[400px] lg:border-l-2 lg:border-gray lg:pl-8'>
            <AddHouseForm />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DashboardPage;
