'use client';
import CustomForm from '@/components/custom-form/CustomForm';
import CustomInput from '@/components/custom-input/CustomInput';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(5, { message: 'Should be more than 5 characters' }),
});

const LoginForms = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      setLoading(false);

      if (res?.error) {
        throw new Error(res.error);
      }

      router.push('/dashboard');
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <div className='pb-8 pt-20 md:flex-[60%] md:self-center md:pt-0'>
        <div className='mb-8 text-center font-lobster'>
          <Link href={'/'} className='bg-light-gray rounded-md p-1 text-xl'>
            Rent
          </Link>
        </div>
        <h1 className='pb-5 text-center'>Login</h1>
        <CustomForm
          form={form}
          formSchema={formSchema}
          onSubmit={onSubmit}
          className='mx-auto w-[90%] max-w-[400px]'
        >
          <CustomInput
            form={form}
            name='email'
            label='Email'
            placeholder='john@example.com'
          />
          <CustomInput
            form={form}
            name='password'
            label='Password'
            type='password'
          />
          {error && <p className='text-center text-warning'>{error}</p>}

          <div className='text-center'>
            <Button type='submit' className='w-[150px]'>
              {!loading ? 'Log In' : 'Processing...'}
            </Button>
          </div>
        </CustomForm>
      </div>
    </>
  );
};

export default LoginForms;
