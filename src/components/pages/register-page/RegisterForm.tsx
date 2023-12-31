'use client';
import CustomForm from '@/components/custom-form/CustomForm';
import FormInput from '@/components/custom-input/CustomInput';
import { Button } from '@/components/ui/button';
import { nextAPI } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
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

const RegisterForms = () => {
  const [passErr, setPassErr] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { userName: '', email: '', password: '', passwordConf: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.password !== values.passwordConf)
      return setPassErr('Password Unmatched');

    try {
      const user = await nextAPI.post('/register', { ...values });

      if (user) {
        setPassErr('');
        signIn(undefined, { callbackUrl: '/' });
      }
    } catch (error) {
      console.log(error);
      setPassErr('Fail to register user.');
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
    </>
  );
};

export default RegisterForms;
