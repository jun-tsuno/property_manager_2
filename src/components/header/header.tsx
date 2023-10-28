'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import DashboardIcon from '../../../public/svgIcon/dashboard';
import LogoutIcon from '../../../public/svgIcon/logout';
import { Button } from '../ui/button';

const Header = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  return (
    <>
      <div className='fixed top-0 z-50 flex h-[60px] w-full items-center justify-between bg-white px-4 py-2 shadow-md'>
        <Link href='/' className='font-lobster text-xl'>
          Rent
        </Link>
        <div className='flex items-center'>
          <Link
            href='/dashboard'
            className='hover:bg-light-gray rounded-full p-2 hover:drop-shadow-xl'
          >
            <DashboardIcon />
          </Link>
          <p className='pl-3'>{userName}</p>
        </div>
        <Button variant='ghost' onClick={() => signOut()}>
          <LogoutIcon width={16} height={16} className='mr-2' />
          Sign Out
        </Button>
      </div>
    </>
  );
};

export default Header;
