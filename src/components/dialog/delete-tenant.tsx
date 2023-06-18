'use client';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';

interface DialogProps {
  tenantId: string;
  houseId: string;
}

const DeleteTenantDialog = ({ tenantId, houseId }: DialogProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log(houseId);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await api.delete(`/api/tenant?id=${tenantId}`);

      setLoading(false);

      if (res.status === 200) {
        router.push(`/dashboard/${houseId}`);
      } else {
        console.log('fail');
      }
    } catch (error) {
      setLoading(false);
      console.log('error');
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='ghost'
            className='text-destructive hover:bg-destructive hover:text-white'
          >
            Remove
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Tenant??</AlertDialogTitle>
            <AlertDialogDescription>
              Tenant information will be deleted permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleDelete} disabled={loading}>
              {loading ? 'Deleting...' : ' Remove Tenant'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteTenantDialog;
