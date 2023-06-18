'use client';
import CustomDialog from '@/components/custom-dialog/custom-dialog';
import CustomForm from '@/components/custom-form/custom-form';
import CustomInput from '@/components/custom-input/custom-input';
import Layout from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const toAddTenant = () => {
    router.push('/dashboard/create/add-tenant');
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { houseName: '', location: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const res = await api.post('/api/house', {
        houseName: values.houseName,
        location: values.location,
      });

      setLoading(false);

      if (res.status === 200) {
        form.reset({ houseName: '', location: '' });
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
        <h2 className='pt-5'>Add house</h2>
        <div className='mx-auto w-[80%] max-w-[400px] py-12'>
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

        <CustomDialog
          open={open}
          setOpen={setOpen}
          title='Successfully Added!'
          description=' Do you want to proceed to add the tenants?'
          cancelTitle='Add another house'
          action={toAddTenant}
          actionTitle='Add Tenant'
        />
      </Layout>
    </>
  );
};

export default AddHousePage;
