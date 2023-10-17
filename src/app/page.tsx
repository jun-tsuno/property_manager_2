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
            <Link href={'/login'}>
              <Button className='bg-gradient-to-r from-gradient-var1 to-gradient-var2 hover:brightness-110'>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className='px-[5%] pb-28 pt-28'>
          <div className='flex flex-col items-center gap-8 md:flex-row-reverse md:justify-center md:gap-20'>
            <div className='relative max-w-[730px]'>
              <Image
                src={'/image/demo-2.png'}
                alt='demo'
                width={0}
                height={0}
                sizes='100vh'
                className='mx-auto w-[80%] shadow-xl shadow-black/30 md:w-[90%]'
              />
              <Image
                src={'/image/demo-1.png'}
                alt='demo'
                width={0}
                height={0}
                sizes='100vh'
                className='absolute top-[-10%] w-[30%] shadow-xl shadow-black/30 md:w-1/3 '
              />
            </div>
            <div className='w-[80%] max-w-[500px] bg-navy px-5 py-20 text-center text-white'>
              <h2 className='pb-5'>Manage your tenants</h2>
              <p>
                You can register your house information and its tenant detail.
                No need to keep track of their monthly fee on paper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopPage;
