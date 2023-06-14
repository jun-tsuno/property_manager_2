import Layout from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { House, Owner } from '@prisma/client';
import axios from 'axios';
import { getServerSession } from 'next-auth/next';
import HouseWithMan from '../../../public/svgIcon/house-man';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const { id: ownerId } = session?.user as Owner;

  const res = await axios.get(`http://localhost:3000/api/house?id=${ownerId}`);
  const houseList = res.data.houseList as House[];
  console.log(houseList);

  return (
    <>
      <Layout>
        <h1>Your House List</h1>
        <div className='flex flex-col items-center py-16'>
          <HouseWithMan width={100} height={100} />
          <p className='py-4'>No houses enrolled yet</p>
          <Button>Add a House</Button>
        </div>
      </Layout>
    </>
  );
};

export default DashboardPage;
