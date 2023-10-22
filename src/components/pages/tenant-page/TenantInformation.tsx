'use client';
import FetchError from '@/components/error/FetchError';
import Loading from '@/components/loading/Loading';
import { useFetchTenant } from '@/hooks/use-fetch-tenant';
import { dateFormat } from '@/utils/dateFormat';
import Image from 'next/image';

interface TenantInformationProps {
  tenantId: string;
}

const InformationList = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => {
  return (
    <li className='flex flex-col gap-2 border-b-[1px] border-slate-200 pb-3 pt-6 sm:flex-row sm:py-6'>
      <span className='min-w-[150px] font-bold'>{label}</span>
      <span>{value || '-'}</span>
    </li>
  );
};

const TenantInformation = ({ tenantId }: TenantInformationProps) => {
  const { data: tenant, isLoading, isError } = useFetchTenant(tenantId);

  if (isLoading) return <Loading withText />;

  if (isError) return <FetchError />;

  const startDate = dateFormat(tenant.startDate);
  const endDate = dateFormat(tenant.endDate);

  return (
    <>
      <div className=''>
        <Image
          src='/image/avatar-man.jpg'
          alt={tenant.name}
          width={0}
          height={0}
          sizes='100vw'
          priority
          className='mx-auto aspect-square w-[120px] rounded-full object-cover object-center'
        />
        <ul>
          <InformationList label='Name' value={tenant.name} />
          <InformationList label='Phone' value={tenant.phone} />
          <InformationList label='Contact' value={tenant.email} />
          <InformationList label='Rent/month' value={tenant.fee.toString()} />
          <InformationList label='Move In' value={startDate} />
          <InformationList label='Move Out' value={endDate} />
        </ul>
      </div>
    </>
  );
};

export default TenantInformation;
