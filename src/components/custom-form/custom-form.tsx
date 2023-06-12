import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '../ui/button';

interface CustomFormProps {
	form: UseFormReturn<any>;
	formSchema: z.ZodObject<any>;
	onSubmit: (values: z.infer<any>) => void;
	children: React.ReactNode;
}

const CustomForm = ({ form, onSubmit, children }: CustomFormProps) => {
	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					{children}
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
		</>
	);
};

export default CustomForm;
