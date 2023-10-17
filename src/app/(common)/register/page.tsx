import RegisterForms from '@/components/pages/register-page/RegisterForm';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Register',
};

const RegisterPage = () => {
  return (
    <>
      <div className='flex h-[100vh] flex-col md:flex-row'>
        <RegisterForms />

        <div className='relative grow md:flex-[40%]'>
          <Image
            src={'/image/calculator.jpg'}
            alt='houses'
            width={0}
            height={0}
            sizes='100vh'
            priority
            className='h-full w-full object-cover'
          />
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-image-blur-lighter text-white'>
            <h2 className='text-xl'>Already have an account?</h2>
            <Link href={'/login'} className='pt-8'>
              <Button variant='outline'>Login Here</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
