import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const TopPage = () => {
  return (
    <>
      <div>
        <div className='relative h-[80vh]'>
          <Image
            src={'/image/hero-house.jpg'}
            alt='house'
            width={0}
            height={0}
            sizes='100vh'
            priority
            className='h-full w-full object-cover'
          />
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-image-blur px-10 text-white md:right-1/2 lg:right-2/3'>
            <h1 className='text-3xl'>Manage your Properties</h1>
            <p className='mb-10 mt-3 text-center text-lg'>
              Effortless Property Management: Simplify House Ownership and
              Tenant Relations
            </p>
            <Link href={'/auth/login'}>
              <Button className='bg-gradient-to-r from-gradient-var1 to-gradient-var2 hover:brightness-110'>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopPage;
