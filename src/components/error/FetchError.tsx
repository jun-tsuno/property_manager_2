import Link from 'next/link';
import { AlertIcon } from '../icons';
import { Button } from '../ui/button';

interface FetchErrorProps {
  errTitle?: string;
  errText?: string;
}

const FetchError = ({ errTitle, errText }: FetchErrorProps) => {
  return (
    <>
      <div className='py-20 text-center'>
        <AlertIcon className='mx-auto mb-4 h-10 w-10' />
        <p className='font-bold'>{errTitle || 'Error!'}</p>
        <p className='mb-8'>{errText || 'Fail to fetch data...'}</p>

        <Link href='/'>
          <Button variant='secondary'>Back to Top Page</Button>
        </Link>
      </div>
    </>
  );
};

export default FetchError;
