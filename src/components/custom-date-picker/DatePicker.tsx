'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/shadcn-ui';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import WarnIcon from '../../../public/svgIcon/warn';

interface DatePickerProps {
  name: string;
  label?: string;
  form: UseFormReturn<any>;
  description?: string;
  withFlag?: boolean;
  className?: string;
}

const DatePicker = (props: DatePickerProps) => {
  const { name, label, form, description, withFlag } = props;

  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel className='flex items-center'>
              {label} <i className='px-2'>{withFlag && <WarnIcon />}</i>
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='z-[200] w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default DatePicker;
