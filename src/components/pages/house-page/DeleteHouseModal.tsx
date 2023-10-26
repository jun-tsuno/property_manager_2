'use client';
import { errorToast, successToast } from '@/components/toast/CustomToast';
import { Button } from '@/components/ui/button';
import { useDeleteHouse } from '@/hooks/use-delete-house';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ModalWrapper from '../../modal/ModalWrapper';

interface DeleteHouseModalProps {
  houseId: string;
}

const DeleteHouseModal = ({ houseId }: DeleteHouseModalProps) => {
  const [openModal, setOpenModal] = useState(false);
  const deleteHouseMutation = useDeleteHouse(houseId);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteHouseMutation.mutateAsync({ houseId });

      successToast('Successfully deleted house');
      setOpenModal(false);
      router.push('/dashboard');
    } catch (error) {
      errorToast('Fail to deleted house');
      setOpenModal(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className='w-full'>
        Delete House
      </Button>

      {openModal && (
        <ModalWrapper setOpen={setOpenModal} className='max-w-[600px]'>
          <>
            <h2 className='mb-6 font-semibold'>
              Are you sure to delete this House?
            </h2>
            <p className='mb-8'>
              The house and tenants information will be deleted permanently.
            </p>

            <div className='mx-auto flex max-w-[500px] flex-col gap-3 sm:flex-row sm:justify-center'>
              <Button
                variant='secondary'
                onClick={() => setOpenModal(false)}
                className='w-full'
              >
                Cancel
              </Button>
              <Button
                variant='destructive'
                onClick={handleDelete}
                className='w-full'
              >
                Delete
              </Button>
            </div>
          </>
        </ModalWrapper>
      )}
    </>
  );
};

export default DeleteHouseModal;
