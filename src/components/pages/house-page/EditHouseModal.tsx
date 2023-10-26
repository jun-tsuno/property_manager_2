'use client';
import CustomForm from '@/components/custom-form/CustomForm';
import CustomInput from '@/components/custom-input/CustomInput';
import { PencilIcon } from '@/components/icons';
import { successToast } from '@/components/toast/CustomToast';
import { Button } from '@/components/ui/button';
import { useUpdateHouse } from '@/hooks/use-update-house';
import { HouseWithTenant } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import ModalWrapper from '../../modal/ModalWrapper';

interface EditHouseModalProps {
  house: HouseWithTenant;
}

const formSchema = z.object({
  houseName: z.string().min(1, { message: 'Required' }),
  location: z.string().min(1, { message: 'Required' }),
});

const EditHouseModal = ({ house }: EditHouseModalProps) => {
  const [openModal, setOpenModal] = useState(false);
  const updateHouseMutation = useUpdateHouse(house.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { houseName: house?.houseName, location: house?.location },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateHouseMutation.mutateAsync({
        houseName: values.houseName,
        location: values.location,
        houseId: house.id,
      });

      form.reset();
      setOpenModal(false);
      successToast('Successfully Updated House');
    } catch (error) {}
  };

  return (
    <>
      <Button
        variant='secondary'
        onClick={() => setOpenModal(true)}
        className='flex w-full items-center gap-2'
      >
        Edit House
        <PencilIcon className='h-4 w-4' />
      </Button>

      {openModal && (
        <ModalWrapper setOpen={setOpenModal}>
          <>
            <h2 className='mb-6 font-semibold'>Edit House</h2>
            <CustomForm
              form={form}
              formSchema={formSchema}
              onSubmit={onSubmit}
              className='pb-4'
            >
              <CustomInput
                form={form}
                name='houseName'
                label='House Name'
                placeholder='House1'
                withFlag
                className='mb-6'
              />
              <CustomInput
                form={form}
                name='location'
                label='Location'
                placeholder='Vancouver'
                withFlag
                className='mb-12'
              />

              <div className='mx-auto flex max-w-[500px] flex-col gap-3 sm:flex-row sm:justify-center'>
                <Button
                  variant='secondary'
                  type='button'
                  onClick={() => setOpenModal(false)}
                  className='w-full'
                >
                  Cancel
                </Button>
                <Button type='submit' className='w-full'>
                  Submit
                </Button>
              </div>
            </CustomForm>
          </>
        </ModalWrapper>
      )}
    </>
  );
};

export default EditHouseModal;
