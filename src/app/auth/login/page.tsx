'use client';
import CustomForm from '@/components/custom-form/custom-form';
import FormInput from '@/components/custom-input/custom-input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(5, { message: 'Should be more than 5 characters' }),
});

const LoginPage = () => {
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

      if (!res?.error) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <>
      <div className='h-[100vh] flex flex-col md:flex-row-reverse'>
        <div className='pt-20 pb-8 md:flex-[60%] md:self-center md:pt-0'>
          <h1 className='text-center pb-5'>Login</h1>
          <CustomForm
            form={form}
            formSchema={formSchema}
            onSubmit={onSubmit}
            className='w-[90%] mx-auto max-w-[400px]'
          >
            <FormInput
              form={form}
              name='email'
              label='Email'
              placeholder='john@example.com'
            />
            <FormInput
              form={form}
              name='password'
              label='Password'
              type='password'
            />
            {error && <p className='text-center text-warning'>{error}</p>}
            <div className='text-center'>
              <Button type='submit' className='w-[150px]'>
                {!loading ? 'Log In' : 'Log In ...'}
              </Button>
            </div>
          </CustomForm>
        </div>

        <div className='relative grow md:flex-[40%]'>
          <Image
            src={'/image/houses.jpg'}
            alt='houses'
            width={0}
            height={0}
            sizes='100vh'
            priority
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-image-blur-lighter text-white'>
            <h2>New Here?</h2>
            <p className='pt-10 pb-20 px-8'>
              Sign up free and start managing your properties.
            </p>
            <Link href={'/auth/register'}>
              <Button variant='outline'>Register Here</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
