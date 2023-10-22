import Spinner from '../spinner/spinner';

interface LoadingProps {
  withText?: boolean;
}

const Loading = ({ withText }: LoadingProps) => {
  return (
    <>
      <div className='py-20 text-center'>
        <div className='mx-auto w-fit pl-3'>
          <Spinner />
        </div>
        {withText && <p className='text-xs'>Loading...</p>}
      </div>
    </>
  );
};

export default Loading;
