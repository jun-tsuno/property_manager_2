'use client';
import { ChangeAvatarIcon } from '@/components/icons';
import useClickOutside from '@/hooks/use-click-outside';
import { AVATARS } from '@/utils/constants';
import Image from 'next/image';

const AvatarSelectModal = () => {
  const { wrapperRef, open, setOpen } = useClickOutside();

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <>
      <div ref={wrapperRef} className='relative mx-auto'>
        <button onClick={() => setOpen(!open)} className='relative'>
          <Image
            src='/image/avatar-man.jpg'
            alt='man-image'
            width={0}
            height={0}
            sizes='100vw'
            priority
            className='h-[120px] w-[120px] rounded-full object-cover object-center lg:h-[160px] lg:w-[160px]'
          />
          <div className='absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 opacity-0 transition-opacity duration-300 hover:opacity-100'>
            <ChangeAvatarIcon className='w-14 fill-white' />
          </div>
        </button>

        {open && (
          <div className='absolute left-1/2 w-[250px] -translate-x-1/2 rounded-xl bg-slate-200 px-6 py-4 shadow-lg'>
            <div className='flex flex-wrap justify-between'>
              {AVATARS.map((avatar) => (
                <button
                  key={avatar.alt}
                  onClick={handleClick}
                  className='hover:scale-105 hover:brightness-95'
                >
                  <Image
                    src={avatar.path}
                    alt={avatar.alt}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='h-14 w-14 rounded-full object-cover object-center'
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AvatarSelectModal;
