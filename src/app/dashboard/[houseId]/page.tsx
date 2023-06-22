import BackButton from '@/components/back-button/back-button';
import CustomTable from '@/components/custom-table/custom-table';
import DeleteHouseDialog from '@/components/dialog/delete-house';
import Layout from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import Link from 'next/link';
import LocationIcon from '../../../../public/svgIcon/location';

interface TenantInfo {
  id: string;
  name: string;
  roomId: number;
  fee: number;
  endDate: Date;
}

const HouseDetail = async ({ params }: { params: { houseId: string } }) => {
  const houseId = params.houseId;

  const res = await api.get(`/api/house-detail?id=${houseId}`);
  const houseDetail = res.data.houseDetail;

  return (
    <>
      <Layout>
        <div className='flex items-center py-5 pl-3'>
          <BackButton to='/dashboard' />
          <h2 className='px-10'>House Detail</h2>
        </div>
        <div className='mx-auto max-w-[800px]'>
          <div className='bg-light-gray rounded-sm p-3 drop-shadow-md'>
            <h3 className='text-center'>{houseDetail?.houseName}</h3>
            <p className='flex items-center justify-center pt-1 text-sm'>
              <LocationIcon />
              <span className='pl-2'>{houseDetail?.location}</span>
            </p>
          </div>
          <div className='py-10'>
            <CustomTable
              tenants={houseDetail?.tenant as TenantInfo[]}
              houseId={houseId}
            />
          </div>

          <div className='flex justify-center gap-3 pt-7 sm:gap-10'>
            <Link href={`/dashboard/${houseId}/add-tenant`}>
              <Button className='bg-green text-black hover:bg-green hover:brightness-110'>
                Add Tenant
              </Button>
            </Link>
            <DeleteHouseDialog houseId={houseId} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HouseDetail;
