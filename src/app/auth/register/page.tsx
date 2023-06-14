'use client';
import CustomForm from '@/components/custom-form/custom-form';
import FormInput from '@/components/custom-input/custom-input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  userName: z.string().min(1, { message: 'Invalid user name' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(5, { message: 'Should be more than 5 characters' }),
  passwordConf: z
    .string()
    .min(5, { message: 'Should be more than 5 characters' }),
});

const RegisterPage = () => {
  const [passErr, setPassErr] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { userName: '', email: '', password: '', passwordConf: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.password !== values.passwordConf)
      return setPassErr('Password Unmatched');

    try {
      const res = await axios.post('/api/register', { ...values });
      if (res.status !== 200) return alert('Register failed');

      setPassErr('');
      signIn(undefined, { callbackUrl: '/' });
    } catch (error) {
      console.log(error);
      setPassErr('');
    }
  };

  return (
    <>
      <div className='flex h-[100vh] flex-col md:flex-row'>
        <div className='pb-8 pt-20 md:flex-[60%] md:self-center md:pt-0'>
          <h1 className='pb-5 text-center'>Register</h1>
          <CustomForm
            form={form}
            formSchema={formSchema}
            onSubmit={onSubmit}
            className='mx-auto w-[90%] max-w-[400px]'
          >
            <FormInput form={form} name='userName' label='User Name' />
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
            <FormInput
              form={form}
              name='passwordConf'
              label='Password Confirm'
              type='password'
            />
            {passErr && <p className='text-center text-warning'>{passErr}</p>}
            <div className='text-center'>
              <Button type='submit' className='w-[150px]'>
                Register
              </Button>
            </div>
          </CustomForm>
        </div>

        <div className='relative grow md:flex-[40%]'>
          <Image
            src={'/image/calculator.jpg'}
            alt='houses'
            width={0}
            height={0}
            sizes='100vh'
            priority
            className='h-full w-full object-cover'
          />
          <div className='absolute inset-0 flex flex-col items-center justify-center bg-image-blur-lighter text-white'>
            <h2 className='text-xl'>Already have an account?</h2>

            <Link href={'/auth/login'} className='pt-8'>
              <Button variant='outline'>Login Here</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
