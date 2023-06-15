import Layout from '@/components/layout/layout';

const HouseDetail = ({ params }: { params: { houseId: string } }) => {
  const houseId = params.houseId;

  return (
    <>
      <Layout>
        <h2 className='py-5'>House Detail</h2>
      </Layout>
    </>
  );
};

export default HouseDetail;
