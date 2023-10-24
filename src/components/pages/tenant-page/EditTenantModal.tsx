'use client';
import DatePicker from '@/components/custom-date-picker/DatePicker';
import CustomForm from '@/components/custom-form/CustomForm';
import CustomInput from '@/components/custom-input/CustomInput';
import ModalWrapper from '@/components/modal/ModalWrapper';
import { errorToast, successToast } from '@/components/toast/CustomToast';
import { Button } from '@/components/ui/button';
import { useUpdateTenant } from '@/hooks/use-update-tenant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tenant } from '@prisma/client';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface EditTenantModalProps {
  tenant: Tenant;
  setOpen: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Should be more than 1 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  roomId: z.coerce.number().optional(),
  phone: z.string().optional(),
  fee: z.coerce.number({ invalid_type_error: 'Must be a Number' }).min(0),
  startDate: z.date(),
  endDate: z.date().optional(),
});

const EditTenantModal = ({ tenant, setOpen }: EditTenantModalProps) => {
  const updateTenantMutation = useUpdateTenant(tenant.id, tenant.houseId);

  const defaultDate = (date: Date | null) => {
    if (!date) return undefined;
    return new Date(date);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tenant.name,
      email: tenant.email,
      roomId: tenant.roomId || undefined,
      phone: tenant.phone || '',
      fee: tenant.fee,
      startDate: defaultDate(tenant.startDate),
      endDate: defaultDate(tenant.endDate),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateTenantMutation.mutateAsync({
        name: values.name,
        email: values.email,
        roomId: values.roomId,
        phone: values.phone,
        fee: values.fee,
        startDate: values.startDate,
        endDate: values.endDate,
        tenantId: tenant.id,
      });

      form.reset();
      successToast('Successfully Updated');
      return setOpen(false);
    } catch (error) {
      errorToast('Fail to Update');
      return setOpen(false);
    }
  };

  return (
    <ModalWrapper
      setOpen={setOpen}
      className='h-fit max-h-[90vh] w-[90%] max-w-[700px] overflow-y-scroll'
    >
      <CustomForm
        form={form}
        formSchema={formSchema}
        onSubmit={onSubmit}
        className='z-[200] space-y-4'
      >
        <CustomInput
          form={form}
          name='name'
          label='Name'
          placeholder='John Smith'
          withFlag
        />
        <div className='flex flex-col gap-4'>
          <CustomInput
            form={form}
            name='email'
            label='Email'
            placeholder='john@example.com'
            withFlag
          />
          <CustomInput
            form={form}
            name='phone'
            label='Phone'
            placeholder='XXX-XXX-XXXX'
          />
        </div>
        <div className='grid gap-4 sm:grid-cols-2'>
          <CustomInput
            form={form}
            name='roomId'
            label='Room No.'
            placeholder='1'
            type='number'
          />
          <CustomInput
            form={form}
            name='fee'
            label='Rent/mon'
            type='number'
            withFlag
          />
          <DatePicker
            form={form}
            name='startDate'
            label='Start Date'
            withFlag
          />
          <DatePicker form={form} name='endDate' label='End Date' />
        </div>

        <div className='flex flex-col items-center gap-4 pb-6 pt-6 sm:flex-row sm:pt-10'>
          <Button
            variant='secondary'
            className='w-full'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </div>
      </CustomForm>
    </ModalWrapper>
  );
};

export default EditTenantModal;
