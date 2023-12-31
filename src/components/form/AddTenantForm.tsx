'use client';
import DatePicker from '@/components/custom-date-picker/DatePicker';
import CustomForm from '@/components/custom-form/CustomForm';
import CustomInput from '@/components/custom-input/CustomInput';
import { Button } from '@/components/ui/button';
import { useAddTenant } from '@/hooks/use-add-tenant';
import { useFetchHouse } from '@/hooks/use-fetch-house';
import { AVATARS } from '@/utils/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { HouseIcon } from '../icons';
import CustomToast, { successToast } from '../toast/CustomToast';

interface AddTenantFormProps {
  houseId: string;
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Should be more than 1 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  roomId: z.coerce.number().optional(),
  phone: z.string().optional(),
  fee: z.coerce.number({ invalid_type_error: 'Must be a Number' }).min(0),
  startDate: z.date(),
  endDate: z.date().optional(),
});

const AddTenantForm = ({ houseId }: AddTenantFormProps) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: house, isError } = useFetchHouse(houseId);
  const addTenantMutation = useAddTenant(houseId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      roomId: 1,
      phone: '',
      fee: 0,
      startDate: undefined,
      endDate: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await addTenantMutation.mutateAsync({
        name: values.name,
        email: values.email,
        roomId: values.roomId,
        phone: values.phone,
        fee: values.fee,
        startDate: values.startDate,
        endDate: values.endDate,
        avatar: AVATARS[2].path,
        houseId,
      });

      form.reset();
      successToast('Successfully Added');
    } catch (error) {
      setError('Fail to add a tenant');
    }
  };

  return (
    <>
      <div className='mb-6 flex items-center justify-center gap-2'>
        <HouseIcon className='h-4 w-4' />
        {house && <p className='text-sm font-bold'>{house.houseName}</p>}
      </div>

      <CustomForm
        form={form}
        formSchema={formSchema}
        onSubmit={onSubmit}
        className='space-y-4'
      >
        <CustomInput
          form={form}
          name='name'
          label='Name'
          placeholder='John Smith'
          withFlag
        />
        <div className='flex flex-col gap-4 sm:flex-row sm:justify-evenly'>
          <CustomInput
            form={form}
            name='email'
            label='Email'
            placeholder='john@example.com'
            withFlag
          />
          <CustomInput
            form={form}
            name='phone'
            label='Phone'
            placeholder='XXX-XXX-XXXX'
          />
        </div>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <CustomInput
            form={form}
            name='roomId'
            label='Room No.'
            placeholder='1'
            type='number'
          />
          <CustomInput
            form={form}
            name='fee'
            label='Rent/mon'
            type='number'
            withFlag
          />
        </div>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <DatePicker
            form={form}
            name='startDate'
            label='Start Date'
            withFlag
          />
          <DatePicker form={form} name='endDate' label='End Date' />
        </div>

        <div className='text-center sm:pt-8'>
          <Button type='submit' className='w-full sm:max-w-[500px]'>
            {!loading ? 'Submit' : 'Please Wait ...'}
          </Button>
          {error && (
            <p className='mx-auto mt-3 w-1/2 rounded-full bg-warning py-1 font-bold'>
              {error}
            </p>
          )}
        </div>
      </CustomForm>

      <CustomToast />
    </>
  );
};

export default AddTenantForm;
