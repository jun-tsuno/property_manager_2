'use client';
import CustomDialog from '@/components/custom-dialog/add-house-dialog';
import CustomForm from '@/components/custom-form/custom-form';
import CustomInput from '@/components/custom-input/custom-input';
import Layout from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  houseName: z.string().min(1, { message: 'Should be more than 1 characters' }),
  location: z.string().min(1, { message: 'Should be more than 1 characters' }),
});

const AddHousePage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { houseName: '', location: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const res = await axios.post('http://localhost:3000/api/house', {
        houseName: values.houseName,
        location: values.location,
      });

      setLoading(false);

      if (res.status === 200) {
        setOpen(true);
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
      <Layout>
        <h2>Add house</h2>
        <div className='mx-auto w-[80%] max-w-[400px]'>
          <CustomForm form={form} formSchema={formSchema} onSubmit={onSubmit}>
            <CustomInput form={form} name='houseName' label='House Name' />
            <CustomInput form={form} name='location' label='Location' />
            <div className='text-center'>
              <Button type='submit'>
                {!loading ? 'Submit' : 'Please Wait ...'}
              </Button>
              {error && <p className='py-3 font-bold text-warning'>{error}</p>}
            </div>
          </CustomForm>
        </div>

        <CustomDialog open={open} setOpen={setOpen} />
      </Layout>
    </>
  );
};

export default AddHousePage;
