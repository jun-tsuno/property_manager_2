import BackButton from '@/components/back-button/back-button';
import CustomTable from '@/components/custom-table/custom-table';
import Layout from '@/components/layout/layout';
import { api } from '@/lib/axios';
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
          <BackButton />
          <h2 className='px-10'>House Detail</h2>
        </div>
        <div className='rounded-sm bg-light-gray p-3 drop-shadow-md'>
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
      </Layout>
    </>
  );
};

export default HouseDetail;
