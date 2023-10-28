import { Form } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

interface CustomFormProps {
  form: UseFormReturn<any>;
  formSchema: z.ZodObject<any>;
  onSubmit: (values: z.infer<any>) => void;
  children: React.ReactNode;
  className?: string;
}

const CustomForm = ({
  form,
  onSubmit,
  children,
  className,
}: CustomFormProps) => {
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`${className ? className : ''}`}
        >
          {children}
        </form>
      </Form>
    </>
  );
};

export default CustomForm;
