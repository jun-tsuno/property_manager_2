'use client';
import DatePicker from '@/components/custom-date-picker/DatePicker';
import CustomForm from '@/components/custom-form/custom-form';
import CustomInput from '@/components/custom-input/custom-input';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
      setLoading(true);

      const res = await api.post('/api/tenant', {
        ...values,
        houseId,
      });

      setLoading(false);

      if (res.status === 200) {
        form.reset();
        console.log('added');
      } else {
        setError('Fail to Create a house');
      }
    } catch (error) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <>
      <CustomForm form={form} formSchema={formSchema} onSubmit={onSubmit}>
        <CustomInput
          form={form}
          name='name'
          label='Name'
          placeholder='John Smith'
          withFlag
        />
        <div className='flex flex-col gap-5 sm:flex-row sm:justify-evenly'>
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
        <div className='flex flex-col gap-5 sm:flex-row'>
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
        <div className='flex flex-col gap-5 sm:flex-row'>
          <DatePicker
            form={form}
            name='startDate'
            label='Start Date'
            withFlag
          />
          <DatePicker form={form} name='endDate' label='End Date' />
        </div>

        <div className='text-center'>
          <Button type='submit'>
            {!loading ? 'Submit' : 'Please Wait ...'}
          </Button>
          {error && <p className='py-3 font-bold text-warning'>{error}</p>}
        </div>
      </CustomForm>
    </>
  );
};

export default AddTenantForm;
