const HouseDetail = ({ params }: { params: { houseId: string } }) => {
  const houseId = params.houseId;

  console.log(houseId);

  return (
    <>
      <h2>House Detail</h2>
    </>
  );
};

export default HouseDetail;
