import HouseCard from '@/components/house-card/house-card';
import Layout from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { House, Owner } from '@prisma/client';
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import { Fragment } from 'react';
import HouseWithMan from '../../../public/svgIcon/house-man';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const { id: ownerId } = session?.user as Owner;

  const res = await axios.get(`http://localhost:3000/api/house?id=${ownerId}`);
  const houseList = res.data.houseList as House[];

  return (
    <>
      <Layout>
        <h1>Your House List</h1>
        {houseList.length > 0 ? (
          <div className='flex flex-wrap justify-center gap-4 py-14'>
            {houseList.map((house) => {
              return (
                <Fragment key={house.id}>
                  <HouseCard
                    houseId={house.id}
                    houseName={house.houseName}
                    location={house.location}
                  />
                </Fragment>
              );
            })}{' '}
          </div>
        ) : (
          <div className='flex flex-col items-center py-16'>
            <HouseWithMan width={100} height={100} />
            <p className='py-4'>No houses enrolled yet</p>
          </div>
        )}
        <div className='text-center'>
          <Button>Add a House</Button>
        </div>
      </Layout>
    </>
  );
};

export default DashboardPage;
