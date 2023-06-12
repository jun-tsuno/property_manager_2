'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CustomForm from '@/components/custom-form/custom-form';
import FormInput from '@/components/custom-input/custom-input';

const formSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(5, { message: 'Should be more than 5 characters' }),
});

const LoginPage = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: '', password: '' },
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<>
			<div>
				<h1>Login</h1>
				<CustomForm form={form} formSchema={formSchema} onSubmit={onSubmit}>
					<FormInput
						form={form}
						name='email'
						label='Email'
						placeholder='john@example.com'
					/>
					<FormInput form={form} name='password' label='Password' />
				</CustomForm>
			</div>
		</>
	);
};

export default LoginPage;
