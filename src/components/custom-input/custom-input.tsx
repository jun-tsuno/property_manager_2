import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { UseFormReturn } from 'react-hook-form';

interface CustomInputProps {
	name: string;
	label?: string;
	placeholder?: string;
	form: UseFormReturn<any>;
	description?: string;
}

const CustomInput = (props: CustomInputProps) => {
	const { name, label, placeholder, form, description } = props;

	return (
		<>
			<FormField
				control={form.control}
				name={name}
				render={({ field }) => (
					<FormItem>
						<FormLabel>{label}</FormLabel>
						<FormControl>
							<Input placeholder={placeholder} {...field} />
						</FormControl>
						<FormDescription>{description}</FormDescription>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};

export default CustomInput;
