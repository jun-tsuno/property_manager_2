import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { dateFormat } from '@/utils/date-formatter';
import { Tenant } from '@prisma/client';
import Link from 'next/link';
import { Fragment } from 'react';
import { Button } from '../ui/button';

interface TenantTableProps {
  tenants: Tenant[];
  className?: string;
}

const TenantTable = ({ tenants, className }: TenantTableProps) => {
  return (
    <>
      <Table className={`${className ? className : ''}`}>
        <TableHeader>
          <TableRow>
            <TableHead>Room</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Fee/m</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants &&
            tenants.length > 0 &&
            tenants.map((tenant) => {
              return (
                <Fragment key={tenant.id}>
                  <TableRow>
                    <TableCell className='font-medium'>
                      {tenant.roomId || '-'}
                    </TableCell>
                    <TableCell>{tenant.name}</TableCell>
                    <TableCell>{tenant.fee}</TableCell>
                    <TableCell>
                      {tenant.endDate ? dateFormat(tenant.endDate) : '-'}
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/${tenant.houseId}/${tenant.id}`}>
                        <Button variant='secondary'>view</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};

export default TenantTable;
