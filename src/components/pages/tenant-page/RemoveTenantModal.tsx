'use client';
import ModalWrapper from '@/components/modal/ModalWrapper';
import { Button } from '@/components/ui/button';
import { useDeleteTenant } from '@/hooks/use-delete-tenant';
import { useRouter } from 'next/navigation';

interface RemoveTenantModal {
  tenantId: string;
  houseId: string;
  setOpen: (open: boolean) => void;
}

const RemoveTenantModal = ({
  tenantId,
  houseId,
  setOpen,
}: RemoveTenantModal) => {
  const deleteTenantMutation = useDeleteTenant(tenantId, houseId);
  const router = useRouter();

  const handleRemove = async () => {
    try {
      await deleteTenantMutation.mutateAsync({ tenantId });

      setOpen(false);
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ModalWrapper setOpen={setOpen} className='h-fit w-[90%] max-w-[700px]'>
        <>
          <h3 className='mb-6'>Are you sure to remove?</h3>
          <p className='mb-6'>
            The tenant information will be permanently deleted.
          </p>

          <div className='flex flex-col items-center gap-4 pb-6 pt-6 sm:flex-row sm:pt-10'>
            <Button
              variant='secondary'
              className='w-full'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type='submit' className='w-full' onClick={handleRemove}>
              Remove
            </Button>
          </div>
        </>
      </ModalWrapper>
    </>
  );
};

export default RemoveTenantModal;
