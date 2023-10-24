import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import WarnIcon from '../../../public/svgIcon/warn';
import { Input } from '../ui/input';

interface CustomInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  form: UseFormReturn<any>;
  description?: string;
  type?: string;
  withFlag?: boolean;
  className?: string;
}

const CustomInput = (props: CustomInputProps) => {
  const {
    name,
    label,
    placeholder,
    form,
    description,
    type,
    withFlag,
    className,
  } = props;

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={`w-full ${className ? className : ''}`}>
            <FormLabel className='flex items-center'>
              {label} <i className='px-2'>{withFlag && <WarnIcon />}</i>
            </FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                autoComplete='off'
                type={type}
                min={type === 'number' ? '0' : ''}
              />
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
