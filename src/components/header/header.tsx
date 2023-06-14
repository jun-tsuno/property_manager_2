'use client';
import { signOut, useSession } from 'next-auth/react';
import LogoutIcon from '../../../public/svgIcon/logout';
import UserIcon from '../../../public/svgIcon/user';
import { Button } from '../ui/button';

const Header = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name;

  return (
    <>
      <div className='shadow-md px-4 py-2 flex justify-between items-center'>
        <div>header</div>
        <div className='flex'>
          <UserIcon />
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
