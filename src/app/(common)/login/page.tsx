import LoginForms from '@/components/pages/login-page/LoginForms';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Login',
};

const LoginPage = () => {
  return (
    <>
      <div className='flex h-[100vh] flex-col md:flex-row-reverse'>
        <LoginForms />

        <div className='relative grow md:flex-[40%]'>
          <Image
            src={'/image/houses.jpg'}
            alt='houses'
            width={0}
            height={0}
            sizes='100vh'
            priority
            className='h-full w-full object-cover'
          />
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-image-blur-lighter text-white'>
            <h2>New Here?</h2>
            <p className='px-8 pb-20 pt-10'>
              Sign up free and start managing your properties.
            </p>
            <Link href={'/register'}>
              <Button variant='outline'>Register Here</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
