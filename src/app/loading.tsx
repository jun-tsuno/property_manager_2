import Spinner from '@/components/spinner/spinner';

const Loading = () => {
  return (
    <>
      <div className='flex flex-col items-center py-20'>
        <Spinner height={17} width={6} margin={3} />
        <h3>Loading Page...</h3>
      </div>
    </>
  );
};

export default Loading;
