'use client';
import { ChangeAvatarIcon } from '@/components/icons';
import { errorToast, successToast } from '@/components/toast/CustomToast';
import useClickOutside from '@/hooks/use-click-outside';
import { useUpdateTenant } from '@/hooks/use-update-tenant';
import { AVATARS } from '@/utils/constants';
import { Tenant } from '@prisma/client';
import Image from 'next/image';

interface AvatarSelectModal {
  tenant: Tenant;
}

const AvatarSelectModal = ({ tenant }: AvatarSelectModal) => {
  const { wrapperRef, open, setOpen } = useClickOutside();
  const updateTenantMutation = useUpdateTenant(tenant?.id, tenant?.houseId);

  const handleSelect = async (path: string) => {
    if (path === tenant.avatar) {
      return setOpen(false);
    }

    try {
      await updateTenantMutation.mutateAsync({
        avatar: path,
        tenantId: tenant.id,
      });

      successToast('Successfully updated');
    } catch (error) {
      errorToast('Fail to update');
    }

    setOpen(false);
  };

  return (
    <>
      <div ref={wrapperRef} className='relative mx-auto h-fit'>
        <button onClick={() => setOpen(!open)} className='relative'>
          <Image
            src={tenant?.avatar || '/image/avatar-cat.jpg'}
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
                  onClick={() => handleSelect(avatar.path)}
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
