import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { dateFormat } from '@/helper/dateFormat';
import Link from 'next/link';
import { Button } from '../ui/button';

interface CustomTableProps {
  tenants: {
    id: string;
    name: string;
    roomId: number;
    fee: number;
    endDate: string;
  }[];
}

const CustomTable = ({ tenants }: CustomTableProps) => {
  return (
    <>
      <Table>
        <TableCaption>A list of the Tenants.</TableCaption>
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
                <>
                  <TableRow key={tenant.id}>
                    <TableCell className='font-medium'>
                      {tenant.roomId || '-'}
                    </TableCell>
                    <TableCell>{tenant.name}</TableCell>
                    <TableCell>{tenant.fee}</TableCell>
                    <TableCell>
                      {tenant.endDate ? dateFormat(tenant.endDate) : '-'}
                    </TableCell>
                    <TableCell>
                      <Link href={`/dashboard/${tenant.id}`} as={''}>
                        <Button variant='link'>view</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
};

export default CustomTable;
