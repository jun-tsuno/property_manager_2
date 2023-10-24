'use client';
import CustomForm from '@/components/custom-form/CustomForm';
import CustomInput from '@/components/custom-input/CustomInput';
import { Button } from '@/components/ui/button';
import { useAddHouse } from '@/hooks/use-add-house';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AddIcon, AlertIcon } from '../icons';
import { successToast } from '../toast/CustomToast';
import ModalWrapper from './ModalWrapper';

const formSchema = z.object({
  houseName: z.string().min(1, { message: 'Required' }),
  location: z.string().min(1, { message: 'Required' }),
});

const AddHouseModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const addHouseMutation = useAddHouse();
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { houseName: '', location: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await addHouseMutation.mutateAsync({
        houseName: values.houseName,
        location: values.location,
      });

      form.reset();
      successToast('Successfully Added House');
    } catch (error) {
      setError('Fail to create a house');
    }
  };

  return (
    <>
      <button onClick={() => setOpenModal(true)}>
        <AddIcon className='h-8 w-8 hover:scale-110 hover:brightness-95' />
      </button>

      {openModal && (
        <ModalWrapper setOpen={setOpenModal}>
          <>
            <h2 className='mb-6'>Add House</h2>
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
              {error && (
                <p className='mt-4 flex items-center justify-center gap-2 text-sm font-bold text-warning'>
                  <AlertIcon className='h-5 w-5' />
                  {error}
                </p>
              )}
            </CustomForm>
          </>
        </ModalWrapper>
      )}
    </>
  );
};

export default AddHouseModal;
