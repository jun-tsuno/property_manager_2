'use client';
import FetchError from '@/components/error/FetchError';
import { HouseIcon, PencilIcon } from '@/components/icons';
import Loading from '@/components/loading/Loading';
import { Button } from '@/components/ui/button';
import { useFetchTenant } from '@/hooks/use-fetch-tenant';
import { dateFormat } from '@/utils/date-formatter';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import RemoveTenantModal from './RemoveTenantModal';
const CustomToast = dynamic(() => import('@/components/toast/CustomToast'));
const EditTenantModal = dynamic(() => import('./EditTenantModal'));

interface TenantInformationProps {
  tenantId: string;
}

const ListItem = ({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) => {
  return (
    <>
      <li className='flex items-center justify-between border-b-[1px] border-slate-200 pb-3 pt-6 sm:py-6'>
        <div className='flex flex-col gap-2 '>
          <span className='min-w-[150px] font-bold sm:flex-row'>{label}</span>
          <span>{value || '-'}</span>
        </div>
      </li>
    </>
  );
};

const TenantInformation = ({ tenantId }: TenantInformationProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const { data: tenant, isLoading, isError } = useFetchTenant(tenantId);

  if (isLoading) return <Loading withText />;

  if (isError) return <FetchError />;

  const startDate = dateFormat(tenant?.startDate);
  const endDate = dateFormat(tenant?.endDate);

  return (
    <>
      <div className='mb-10 flex items-center gap-2'>
        <HouseIcon className='h-6 w-6' />
        <h2>{tenant?.house?.houseName || '-'}</h2>
      </div>

      <div className='flex flex-col gap-3 lg:flex-row lg:gap-10'>
        <Image
          src='/image/avatar-man.jpg'
          alt={tenant?.name}
          width={0}
          height={0}
          sizes='100vw'
          priority
          className='mx-auto h-[120px] w-[120px] rounded-full object-cover object-center lg:h-[160px] lg:w-[160px]'
        />
        <div className='lg:max-w-[700px] lg:grow'>
          <ul className='mb-8 grid sm:grid-cols-2 md:mb-16'>
            <ListItem label='Name' value={tenant?.name} />
            <ListItem label='Room' value={tenant?.roomId?.toString()} />
            <ListItem label='Phone' value={tenant?.phone} />
            <ListItem label='Contact' value={tenant?.email} />
            <ListItem label='Rent/month' value={tenant?.fee.toString()} />
            <ListItem label='Move In' value={startDate} />
            <ListItem label='Move Out' value={endDate} />
          </ul>

          <div className='mx-auto flex max-w-[600px] flex-col gap-3 sm:flex-row'>
            <Button
              variant='secondary'
              className='flex w-full items-center gap-2'
              onClick={() => setOpenEditModal(true)}
            >
              <span>Edit</span>
              <PencilIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='default'
              className='w-full'
              onClick={() => setOpenRemoveModal(true)}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      {openEditModal && (
        <EditTenantModal tenant={tenant} setOpen={setOpenEditModal} />
      )}
      {openRemoveModal && (
        <RemoveTenantModal
          tenantId={tenant?.id}
          houseId={tenant?.houseId}
          setOpen={setOpenRemoveModal}
        />
      )}

      <CustomToast />
    </>
  );
};

export default TenantInformation;
